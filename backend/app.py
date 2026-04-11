import os
import re
from contextlib import contextmanager
from typing import Any

from dotenv import load_dotenv
from flask import Flask, jsonify, request
from flask_cors import CORS
import psycopg
from psycopg.rows import dict_row

load_dotenv()
load_dotenv(os.path.join(os.path.dirname(__file__), '..', '.env'))

app = Flask(__name__)
CORS(app)

DATABASE_URL = os.getenv('DATABASE_URL')
ADMIN_TOKEN = os.getenv('ADMIN_TOKEN', 'change-me')

if not DATABASE_URL:
    raise RuntimeError('DATABASE_URL is required')


def normalize_database_url(url: str) -> str:
    if '?schema=' in url:
        return url.split('?schema=')[0]
    return url


DATABASE_URL = normalize_database_url(DATABASE_URL)


def slugify(text: str) -> str:
    text = text.strip().lower()
    text = re.sub(r'[^a-z0-9\s-]', '', text)
    text = re.sub(r'\s+', '-', text)
    text = re.sub(r'-+', '-', text)
    return text


def extract_youtube_video_id(url: str) -> str | None:
    value = (url or '').strip()
    if not value:
        return None

    patterns = [
        r'(?:youtube\.com/watch\?v=)([A-Za-z0-9_-]{11})',
        r'(?:youtu\.be/)([A-Za-z0-9_-]{11})',
        r'(?:youtube\.com/embed/)([A-Za-z0-9_-]{11})',
        r'(?:youtube\.com/shorts/)([A-Za-z0-9_-]{11})',
    ]

    for pattern in patterns:
        match = re.search(pattern, value)
        if match:
            return match.group(1)

    fallback = re.search(r'([A-Za-z0-9_-]{11})', value)
    return fallback.group(1) if fallback else None


def to_int(value: Any) -> int | None:
    if value is None or value == '':
        return None
    return int(value)


def to_bool(value: Any, default: bool = False) -> bool:
    if value is None:
        return default
    if isinstance(value, bool):
        return value
    if isinstance(value, str):
        return value.strip().lower() in {'1', 'true', 'yes', 'on'}
    return bool(value)


@contextmanager
def get_db_conn():
    conn = psycopg.connect(DATABASE_URL)
    try:
        yield conn
        conn.commit()
    except Exception:
        conn.rollback()
        raise
    finally:
        conn.close()


def ensure_admin_auth() -> tuple[bool, Any]:
    token = request.headers.get('x-admin-token')
    if token != ADMIN_TOKEN:
        return False, (jsonify({'error': 'Unauthorized'}), 401)
    return True, None


def parse_property_payload(payload: dict[str, Any], require_all: bool = True) -> dict[str, Any]:
    title = payload.get('title', '').strip()
    description = payload.get('description', '').strip()
    location = payload.get('location', '').strip()
    currency = payload.get('currency', 'KES').strip() or 'KES'
    status = payload.get('status', 'AVAILABLE')

    raw_amenities = payload.get('amenities', [])
    raw_images = payload.get('images', [])

    if isinstance(raw_amenities, str):
        raw_amenities = [item.strip() for item in re.split(r'\r?\n|,', raw_amenities) if item.strip()]
    if isinstance(raw_images, str):
        raw_images = [item.strip() for item in re.split(r'\r?\n|,', raw_images) if item.strip()]

    data = {
        'title': title,
        'slug': slugify(payload.get('slug') or title),
        'description': description,
        'price': to_int(payload.get('price')),
        'currency': currency,
        'location': location,
        'bedrooms': to_int(payload.get('bedrooms')),
        'bathrooms': to_int(payload.get('bathrooms')),
        'sizeSqm': to_int(payload.get('sizeSqm')),
        'amenities': raw_amenities,
        'images': raw_images,
        'featured': bool(payload.get('featured', False)),
        'status': status,
    }

    if require_all:
        required = ['title', 'description', 'location', 'price', 'bedrooms', 'bathrooms']
        missing = [field for field in required if not data.get(field)]
        if missing:
            raise ValueError(f'Missing fields: {", ".join(missing)}')

    return data


def parse_project_video_payload(payload: dict[str, Any], require_all: bool = True) -> dict[str, Any]:
    title = str(payload.get('title') or '').strip()
    youtube_url = str(payload.get('youtubeUrl') or '').strip()
    thumbnail_url = str(payload.get('thumbnailUrl') or '').strip()
    description = str(payload.get('description') or '').strip() or None
    sort_order = to_int(payload.get('sortOrder'))

    if not thumbnail_url and youtube_url:
        video_id = extract_youtube_video_id(youtube_url)
        if not video_id:
            raise ValueError('Invalid YouTube URL. Please provide a valid YouTube link or a thumbnail URL.')
        thumbnail_url = f'https://i.ytimg.com/vi/{video_id}/hqdefault.jpg'

    data = {
        'title': title,
        'youtubeUrl': youtube_url,
        'thumbnailUrl': thumbnail_url,
        'description': description,
        'sortOrder': sort_order if sort_order is not None else 0,
        'isActive': to_bool(payload.get('isActive'), default=True),
    }

    if require_all:
        required = ['title', 'youtubeUrl']
        missing = [field for field in required if not data.get(field)]
        if missing:
            raise ValueError(f'Missing fields: {", ".join(missing)}')

    if not data['thumbnailUrl']:
        raise ValueError('Thumbnail URL is required when it cannot be derived from the YouTube URL.')

    return data


@app.get('/api/health')
def health():
    return jsonify({'ok': True})


@app.post('/api/admin/login')
def admin_login():
    body = request.get_json(silent=True) or {}
    token = body.get('token')
    if token != ADMIN_TOKEN:
        return jsonify({'error': 'Invalid token'}), 401
    return jsonify({'success': True})


@app.get('/api/properties')
def list_properties():
    ok, error = ensure_admin_auth()
    if not ok:
        return error

    with get_db_conn() as conn:
        with conn.cursor(row_factory=dict_row) as cursor:
            cursor.execute('SELECT * FROM "Property" ORDER BY "createdAt" DESC')
            rows = cursor.fetchall()
    return jsonify(rows)


@app.get('/api/properties/<property_id>')
def get_property(property_id: str):
    ok, error = ensure_admin_auth()
    if not ok:
        return error

    with get_db_conn() as conn:
        with conn.cursor(row_factory=dict_row) as cursor:
            cursor.execute('SELECT * FROM "Property" WHERE id = %s', (property_id,))
            row = cursor.fetchone()
    if not row:
        return jsonify({'error': 'Not found'}), 404
    return jsonify(row)


@app.post('/api/properties')
def create_property():
    ok, error = ensure_admin_auth()
    if not ok:
        return error

    body = request.get_json(silent=True) or {}

    try:
        data = parse_property_payload(body, require_all=True)
    except Exception as exc:
        return jsonify({'error': str(exc)}), 400

    query = '''
        INSERT INTO "Property" (
            id, "createdAt", "updatedAt", title, slug, description, price, currency, location,
            bedrooms, bathrooms, "sizeSqm", amenities, images, featured, status
        ) VALUES (
            gen_random_uuid()::text, NOW(), NOW(), %s, %s, %s, %s, %s, %s,
            %s, %s, %s, %s, %s, %s, %s::"PropertyStatus"
        )
        RETURNING *
    '''

    with get_db_conn() as conn:
        with conn.cursor(row_factory=dict_row) as cursor:
            cursor.execute(
                query,
                (
                    data['title'],
                    data['slug'],
                    data['description'],
                    data['price'],
                    data['currency'],
                    data['location'],
                    data['bedrooms'],
                    data['bathrooms'],
                    data['sizeSqm'],
                    data['amenities'],
                    data['images'],
                    data['featured'],
                    data['status'],
                ),
            )
            created = cursor.fetchone()

    return jsonify(created), 201


@app.put('/api/properties/<property_id>')
def update_property(property_id: str):
    ok, error = ensure_admin_auth()
    if not ok:
        return error

    body = request.get_json(silent=True) or {}

    try:
        data = parse_property_payload(body, require_all=True)
    except Exception as exc:
        return jsonify({'error': str(exc)}), 400

    query = '''
        UPDATE "Property"
        SET
            title = %s,
            slug = %s,
            description = %s,
            price = %s,
            currency = %s,
            location = %s,
            bedrooms = %s,
            bathrooms = %s,
            "sizeSqm" = %s,
            amenities = %s,
            images = %s,
            featured = %s,
            status = %s::"PropertyStatus",
            "updatedAt" = NOW()
        WHERE id = %s
        RETURNING *
    '''

    with get_db_conn() as conn:
        with conn.cursor(row_factory=dict_row) as cursor:
            cursor.execute(
                query,
                (
                    data['title'],
                    data['slug'],
                    data['description'],
                    data['price'],
                    data['currency'],
                    data['location'],
                    data['bedrooms'],
                    data['bathrooms'],
                    data['sizeSqm'],
                    data['amenities'],
                    data['images'],
                    data['featured'],
                    data['status'],
                    property_id,
                ),
            )
            updated = cursor.fetchone()

    if not updated:
        return jsonify({'error': 'Not found'}), 404

    return jsonify(updated)


@app.delete('/api/properties/<property_id>')
def delete_property(property_id: str):
    ok, error = ensure_admin_auth()
    if not ok:
        return error

    with get_db_conn() as conn:
        with conn.cursor() as cursor:
            cursor.execute('DELETE FROM "Property" WHERE id = %s', (property_id,))
            deleted_count = cursor.rowcount

    if deleted_count == 0:
        return jsonify({'error': 'Not found'}), 404

    return jsonify({'success': True})


@app.get('/api/public/project-videos')
def list_public_project_videos():
    with get_db_conn() as conn:
        with conn.cursor(row_factory=dict_row) as cursor:
            cursor.execute(
                'SELECT * FROM "ProjectVideo" WHERE "isActive" = true ORDER BY "sortOrder" ASC, "createdAt" DESC'
            )
            rows = cursor.fetchall()
    return jsonify(rows)


@app.get('/api/project-videos')
def list_project_videos():
    ok, error = ensure_admin_auth()
    if not ok:
        return error

    with get_db_conn() as conn:
        with conn.cursor(row_factory=dict_row) as cursor:
            cursor.execute('SELECT * FROM "ProjectVideo" ORDER BY "sortOrder" ASC, "createdAt" DESC')
            rows = cursor.fetchall()
    return jsonify(rows)


@app.get('/api/project-videos/<video_id>')
def get_project_video(video_id: str):
    ok, error = ensure_admin_auth()
    if not ok:
        return error

    with get_db_conn() as conn:
        with conn.cursor(row_factory=dict_row) as cursor:
            cursor.execute('SELECT * FROM "ProjectVideo" WHERE id = %s', (video_id,))
            row = cursor.fetchone()

    if not row:
        return jsonify({'error': 'Not found'}), 404

    return jsonify(row)


@app.post('/api/project-videos')
def create_project_video():
    ok, error = ensure_admin_auth()
    if not ok:
        return error

    body = request.get_json(silent=True) or {}

    try:
        data = parse_project_video_payload(body, require_all=True)
    except Exception as exc:
        return jsonify({'error': str(exc)}), 400

    query = '''
        INSERT INTO "ProjectVideo" (
            id, "createdAt", "updatedAt", title, "youtubeUrl", "thumbnailUrl", description, "sortOrder", "isActive"
        ) VALUES (
            gen_random_uuid()::text, NOW(), NOW(), %s, %s, %s, %s, %s, %s
        )
        RETURNING *
    '''

    with get_db_conn() as conn:
        with conn.cursor(row_factory=dict_row) as cursor:
            cursor.execute(
                query,
                (
                    data['title'],
                    data['youtubeUrl'],
                    data['thumbnailUrl'],
                    data['description'],
                    data['sortOrder'],
                    data['isActive'],
                ),
            )
            created = cursor.fetchone()

    return jsonify(created), 201


@app.put('/api/project-videos/<video_id>')
def update_project_video(video_id: str):
    ok, error = ensure_admin_auth()
    if not ok:
        return error

    body = request.get_json(silent=True) or {}

    try:
        data = parse_project_video_payload(body, require_all=True)
    except Exception as exc:
        return jsonify({'error': str(exc)}), 400

    query = '''
        UPDATE "ProjectVideo"
        SET
            title = %s,
            "youtubeUrl" = %s,
            "thumbnailUrl" = %s,
            description = %s,
            "sortOrder" = %s,
            "isActive" = %s,
            "updatedAt" = NOW()
        WHERE id = %s
        RETURNING *
    '''

    with get_db_conn() as conn:
        with conn.cursor(row_factory=dict_row) as cursor:
            cursor.execute(
                query,
                (
                    data['title'],
                    data['youtubeUrl'],
                    data['thumbnailUrl'],
                    data['description'],
                    data['sortOrder'],
                    data['isActive'],
                    video_id,
                ),
            )
            updated = cursor.fetchone()

    if not updated:
        return jsonify({'error': 'Not found'}), 404

    return jsonify(updated)


@app.delete('/api/project-videos/<video_id>')
def delete_project_video(video_id: str):
    ok, error = ensure_admin_auth()
    if not ok:
        return error

    with get_db_conn() as conn:
        with conn.cursor() as cursor:
            cursor.execute('DELETE FROM "ProjectVideo" WHERE id = %s', (video_id,))
            deleted_count = cursor.rowcount

    if deleted_count == 0:
        return jsonify({'error': 'Not found'}), 404

    return jsonify({'success': True})


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
