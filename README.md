# Potato Dashboard

Small home-server dashboard prototype with Google sign-in and approved-email access.

## 1. Environment Files

Create a root `.env` from `.env.example`:

```bash
cp .env.example .env
```

Root `.env`:

```env
VITE_GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
```

Create `frontend/.env` from `frontend/.env.example`:

```bash
cp frontend/.env.example frontend/.env
```

Frontend `.env`:

```env
VITE_API_URL=
VITE_GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
```

Create `backend/.env` from `backend/.env.example`:

```bash
cp backend/.env.example backend/.env
```

Backend `.env`:

```env
FRONTEND_ORIGIN=http://localhost:5173
HOST=0.0.0.0
PORT=8000
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
SESSION_SECRET=replace-this-with-a-long-random-secret
APPROVED_EMAILS=you@gmail.com
VISIBLE_DISK_MOUNTS=/,/mnt/storage
COOKIE_SECURE=false
```

## 2. Development

```bash
docker compose up --build
```

Open:

```txt
http://localhost:5173
```

## 3. Production

```bash
docker compose -f docker-compose.prod.yml --env-file .env up --build
```

Open:

```txt
http://localhost:5173
```

Production frontend requests use `/api`, and nginx proxies them to the backend container.

## Notes

- Only emails in `APPROVED_EMAILS` can access the dashboard.
- Keep `.env` and `backend/.env` out of Git.
- For plain HTTP/local testing, keep `COOKIE_SECURE=false`.
- Set `VISIBLE_DISK_MOUNTS` to control which Docker-visible disks appear on the dashboard.
