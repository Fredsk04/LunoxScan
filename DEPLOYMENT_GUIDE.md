# LunoxScan Deployment Guide

## 1. Frontend Deployment (Vercel)

The frontend is a Next.js application designed to run on Vercel.

1.  Push your code to GitHub/GitLab/Bitbucket.
2.  Import the project into Vercel.
3.  Select the `frontend` directory as the Root Directory.
4.  Adding Environment Variables:
    *   `NEXT_PUBLIC_API_URL`: The URL of your deployed backend (e.g., `https://lunoxscan-api.railway.app`).
    *   **Crucial:** Do not include a trailing slash.

## 2. Backend Deployment (Railway or Render)

The backend is a Node.js/Express app with a MySQL database.

### Option A: Railway (Recommended)
1.  Create a new project on Railway.
2.  Add a Database (MySQL).
3.  Add a Service from your GitHub repo (select `backend` folder as root).
4.  Add Environment Variables in Railway Service settings:
    *   `DB_HOST`: Use the `${MYSQLHOST}` variable provided by Railway.
    *   `DB_USER`: `${MYSQLUSER}`
    *   `DB_PASSWORD`: `${MYSQLPASSWORD}`
    *   `DB_NAME`: `${MYSQLDATABASE}`
    *   `PORT`: `4000` (or leave default and update your code).
    *   `JWT_SECRET`: Generate a secure random string.

### Option B: Render
1.  Create a Web Service for the backend (Node.js).
2.  Create a MySQL database on Render (or external provider).
3.  Set environment variables similar to Railway.

## 3. Connecting Frontend to Backend

1.  Once your backend is deployed, copy its URL.
2.  Go to your Vercel project settings > Environment Variables.
3.  Add `NEXT_PUBLIC_API_URL` with the backend URL.
4.  Redeploy the frontend.

## 4. Important: Code Changes Required

Currently, the frontend code has hardcoded references to `http://localhost:4000`.
You MUST search and replace all instances of `http://localhost:4000` with calls to the API proxy or the environment variable.

The `next.config.ts` has been updated to proxy `/api` requests to `NEXT_PUBLIC_API_URL` (or localhost default).
This means you can change your fetch calls from:
`fetch("http://localhost:4000/api/mangas")`
to:
`fetch("/api/mangas")`

This is the BEST way to handle URLs as it works automatically in both development and production.

**Status:** The `next.config.ts` file has been updated to support this proxying. You simply need to remove `http://localhost:4000` from your `fetch` calls in the frontend code.
