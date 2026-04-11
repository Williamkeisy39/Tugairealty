# Tugai Realtors

A modern, minimal, luxury real estate experience inspired by high-end agencies.

## Stack

- Next.js (App Router)
- Tailwind CSS
- Prisma + PostgreSQL
- Flask backend for admin APIs
- Admin dashboard for listings management

## Getting Started

1. Install dependencies

```bash
npm install
```

2. Copy `.env.example` to `.env` and update:

- `DATABASE_URL`
- `ADMIN_TOKEN`
- `FLASK_API_URL`
- `NEXT_PUBLIC_WHATSAPP_NUMBER`

3. Setup database

```bash
npx prisma generate
npx prisma migrate dev --name init
npx prisma db seed
```

4. Run the Flask backend (admin API)

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

5. Run the Next.js app

```bash
npm run dev
```

Visit http://localhost:3000

## Admin Dashboard

- Login: `http://localhost:3000/admin/login`
- Use the same value as `ADMIN_TOKEN`
- CRUD pages:
  - `http://localhost:3000/admin`
  - `http://localhost:3000/admin/properties/new`
  - `http://localhost:3000/admin/properties/:id`

## Flask Admin API Endpoints

- `POST /api/admin/login`
- `GET /api/properties`
- `GET /api/properties/:id`
- `POST /api/properties`
- `PUT /api/properties/:id`
- `DELETE /api/properties/:id`

Protected routes require: `x-admin-token: <ADMIN_TOKEN>`
