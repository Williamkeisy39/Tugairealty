# Flask Admin Backend

## Run

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

Runs on `http://localhost:5000`.

## Endpoints

- `POST /api/admin/login`
- `GET /api/properties`
- `GET /api/properties/<id>`
- `POST /api/properties`
- `PUT /api/properties/<id>`
- `DELETE /api/properties/<id>`

Admin endpoints require header: `x-admin-token: <ADMIN_TOKEN>`
