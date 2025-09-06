# Byte Mavericks

This repository contains a small full-stack React + Node.js project focused on agricultural assistance: disease detection, expert listing, courses (including "How to Plant" guides), and a simple chat/suggestion backend. The app supports English and Nepali languages.


## Contents

- `clientSide/` - The frontend React app (Vite, TailwindCSS, Zustand for state).
  - `src/` - React source files
    - `component/` - UI components (disease scanner, experts, courses, HowToPlant, etc.)
    - `assets/data/cauliflower.json` - Example crop guide data (supports `en`/`np` strings)
    - `store.js` - Zustand store (language toggle, sidebar state)
  - `package.json`, `vite.config.js` etc.
- `server/` - Minimal Node/Express backend
  - `controllers/` - Route handlers (detectController, cropsSuggestionController, chatSystem)
  - `routes/` - Express route definitions
  - `uploads/` - Uploaded images used by detection API
  - `server.js` - App entry point

---

## Project overview

This project demonstrates:

- Image-based disease detection endpoint (backend accepts uploads; frontend can scan/upload images)
- Language toggle (English / Nepali) using Zustand and content objects with `en`/`np` keys
- Data-driven course / how-to pages using JSON files (for example `cauliflower.json`)
- Simple expert listing & modal UI

The code is organized to be easy to extend with more crops, additional languages, or improved ML endpoints.

---

## Prerequisites

- Node.js 16+ (Windows, macOS, Linux)
- npm or yarn

All commands below assume you are in the repo root using Git Bash / WSL / bash.exe on Windows.

---

## Running the app locally

1. Install dependencies for both client and server.

```bash
# From repo root
cd clientSide
npm install
# in a second terminal
cd ../server
npm install
```

2. Start the backend server (default port shown in `server/server.js`).

```bash
cd server
npm run dev # or `node server.js` depending on package.json scripts
```

3. Start the frontend dev server (Vite).

```bash
cd clientSide
npm run dev
```

Open the URL shown by Vite (usually `http://localhost:5173`) to view the app.

---

## Important frontend details

- Language: `src/store.js` exposes `language` (`en` or `np`) and `setLanguage()`.
- How-to guides: `src/assets/data/<crop>.json` uses this shape: an array of sections, each with `section` and `steps`. Each `step` should provide:
  - `title` (string)
  - `desc` (object with `en`/`np` or string)
  - `detail` (object with `en`/`np` or string) — optional



## Important backend details

- API routes live in `server/routes/` and are handled by controllers in `server/controllers/`.
- The image upload folder is `server/uploads/` and already contains example images.
- The detect endpoint accepts multipart/form-data uploads and returns detection results (see `detectController.js`).

If you add a model or external ML service, wire it into the `detectController` or create a new route for it.


## Scripts (quick reference)

- Frontend
  - npm run dev — Start Vite dev server
  - npm run build — Build production bundle
- Backend
  - npm start — Start backend in dev mode (if a script present) or `node server.js`

Check `clientSide/package.json` and `server/package.json` for exact scripts.

---



## Deployment notes

- The frontend built by Vite can be served as static assets by any static host or combined with the backend Express server to serve the built files.
- For production, configure environment variables for server port and any third-party API keys.



## Where to look first

- Frontend entry: `clientSide/src/main.jsx`
- Language state: `clientSide/src/store.js`
- Backend entry: `server/server.js`


