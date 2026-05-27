e# Expense Tracker — Frontend (Next.js PWA)

Mobile-first Next.js App Router UI for the Expense Tracker backend.

## Stack

- **Next.js 15** (App Router, client-side data fetching)
- **Tailwind CSS v4**
- **Axios** — API client with refresh-token interceptor
- **TanStack Query** — caching and mutations
- **react-hot-toast** — feedback

## Prerequisites

- Node.js 18+
- Backend running (see `../Backend`)

## Environment

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_API_URL` | Backend base URL, e.g. `http://localhost:5000` |

Change the API URL in **`.env.local`** (or your deployment env). Restart `npm run dev` after changes.

Backend should set `CLIENT_URL=http://localhost:3000` in `Backend/.env` for CORS.

## Run locally

**Terminal 1 — Backend**

```bash
cd Backend
cp .env.example .env   # if you have one; otherwise create .env
```

Example `Backend/.env`:

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/expense-tracker
JWT_SECRET=your_jwt_secret_min_32_chars
JWT_REFRESH_SECRET=your_refresh_secret_min_32_chars
CLIENT_URL=http://localhost:3000
NODE_ENV=development
```

```bash
npm install
npm run dev
```

**Terminal 2 — Frontend**

```bash
cd app-frontend
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Testing on your phone (same Wi‑Fi)

`localhost` on your phone means **the phone**, not your PC — API calls will fail with **Network Error**.

1. Find your PC IP: `ipconfig` → **IPv4 Address** (e.g. `192.168.1.10` or `172.18.4.132`).
2. In `app-frontend/.env.local`:
   ```env
   NEXT_PUBLIC_API_URL=http://192.168.1.10:5000
   ```
3. In `Backend/.env`:
   ```env
   CLIENT_URL=http://192.168.1.10:3000
   ```
4. Restart **both** servers (`npm run dev` in each folder).
5. On your phone, open **`http://192.168.1.10:3000`** (not `localhost`).
6. Allow ports **3000** and **5000** in Windows Firewall if prompted.

The frontend dev script binds to `0.0.0.0` so the phone can reach your PC.

## Auth & refresh flow

1. **Register / Login** — `POST /api/auth/register` or `/login` returns `accessToken` (15 min) and sets an **HttpOnly** `refreshToken` cookie (7 days). The access token is kept **in memory** only (React state + `tokenStore`).
2. **API calls** — Axios adds `Authorization: Bearer <accessToken>` and sends `withCredentials: true` so cookies are included.
3. **On 401** — Interceptor calls `POST /api/auth/refresh-token` with credentials; on success updates the access token and **retries** the failed request.
4. **App start** — `AuthProvider` calls refresh-token silently; if valid, loads `/api/auth/me`.
5. **Logout** — Clears in-memory token and redirects to `/login`. There is **no** `POST /api/auth/logout` route on the backend; the refresh cookie may remain until expiry.

Implementation:

- `src/lib/api.js` — Axios instance + interceptors
- `src/lib/auth-token.js` — in-memory token bridge for interceptors
- `src/context/AuthContext.jsx` — login, register, refresh, user state

### Fetch example (budgets)

```javascript
const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/budgets`, {
  credentials: "include",
  headers: { Authorization: `Bearer ${tokenStore.get()}` },
});
const { data } = await res.json();
```

## Project structure

```
src/
  lib/api.js              # Axios + refresh interceptor
  lib/auth-token.js
  context/AuthContext.jsx
  hooks/useAuth.js, useBudgets.js, useExpenses.js, useDashboard.js
  components/             # UI, forms, layout
  app/
    (auth)/login, register
    (app)/dashboard, budgets, expenses, profile
```

## Screens

| Route | Description |
|-------|-------------|
| `/login` | Email/password sign in |
| `/register` | Create account |
| `/dashboard` | Summary cards + month/year picker |
| `/budgets` | List, create, edit, delete budgets |
| `/expenses` | List, filters, infinite scroll, swipe delete |
| `/expenses/add` | Add expense |
| `/profile` | Monthly income, theme, currency, logout |

## Manual test plan

1. Start backend + frontend with `NEXT_PUBLIC_API_URL=http://localhost:5000`.
2. **Register** a user (password: upper, lower, number, special).
3. Confirm redirect to **dashboard** with income/budget/spent/remaining.
4. **Create budgets** on `/budgets`; edit and delete one.
5. **Add expense** from dashboard FAB or `/expenses/add`; see it on `/expenses`.
6. Test **pagination** (add 15+ expenses) and **search/filter**.
7. **Profile** — update monthly income; verify dashboard updates.
8. **Token refresh** — wait 15+ minutes or temporarily break access token in DevTools; next API call should refresh without manual login (refresh cookie still valid).
9. Resize to **360×800** — bottom nav, 44px+ tap targets, swipe expense row left to delete.

## Sample cURL

```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Jane Doe","email":"jane@example.com","password":"Secret1!","confirmPassword":"Secret1!"}' \
  -c cookies.txt

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"jane@example.com","password":"Secret1!"}' \
  -c cookies.txt

# Refresh (uses cookie file)
curl -X POST http://localhost:5000/api/auth/refresh-token -b cookies.txt -c cookies.txt

# Dashboard (replace TOKEN)
curl http://localhost:5000/api/dashboard/?month=5&year=2026 \
  -H "Authorization: Bearer TOKEN"
```

## Backend gaps (workarounds)

| Issue | Workaround |
|-------|------------|
| No `POST /api/auth/logout` | Frontend clears memory token; cookie expires in 7d |
| `auth.controller.js` has broken `logout` export (not routed) | Safe to ignore until backend adds route |
| `GET /api/expenses` returns HTTP 201 | Frontend treats any 2xx as success |

### Suggested backend patch (logout route)

Add to `auth.routes.js`:

```javascript
authrouter.post("/logout", protect, logout);
```

Fix `logout` in `auth.controller.js` to clear cookie and `user.refreshToken` only.

## Build

```bash
npm run build
npm start
```
