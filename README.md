# Invoice Generator

Full‑stack web app to manage clients, create invoices, track payments, and generate invoice PDFs.

- **Frontend:** React + Vite  
- **Backend:** Node.js + Express  
- **Database/ORM:** Prisma + SQLite  
- **PDF:** PDFKit  

---

## Table of contents

- [Features](#features)
- [Architecture](#architecture)
- [Repository structure](#repository-structure)
- [API overview](#api-overview)
- [Getting started (local development)](#getting-started-local-development)
  - [Prerequisites](#prerequisites)
  - [Run the backend](#run-the-backend)
  - [Run the frontend](#run-the-frontend)
- [Tech stack](#tech-stack)
- [Notes](#notes)
- [Author](#author)

---

## Features

- Create and manage **clients**
- Create **invoices**
- Track **payments**
- Generate **PDF invoices** on the server

---

## Architecture

### Frontend (React + Vite)

The frontend is a single-page app built with React and Vite. It is organized around pages (screens) and reusable UI components, and communicates with the backend via Axios.

Key folders:
- `frontend/src/pages` — route-level screens (Dashboard, Clients, Create Invoice)
- `frontend/src/components` — reusable UI components
- `frontend/src/api` — Axios API client/helpers

### Backend (Node.js + Express + Prisma)

The backend exposes REST endpoints under `/api/*` with a conventional separation of concerns:
- **Routes** map URLs to controllers
- **Controllers** handle HTTP request/response logic
- **Services** encapsulate business/domain logic
- **Utils** provide infrastructure helpers (Prisma initialization, PDF generation)

Prisma manages the schema and database access using SQLite.

---

## Repository structure

At the root, the repository is organized as two separate apps:

```txt
invoice-generator/
  backend/    # Express API + Prisma + PDF generation
  frontend/   # React + Vite UI
```

> Note: `frontend/README.md` is the default Vite template README. This root README documents the overall project.

---

## API overview

The backend mounts routes under `/api` and (by convention in this repo) exposes route groups such as:

- `/api/invoices`
- `/api/clients`
- `/api/payments`

The server defaults to **port 5000** (see `backend/src/server.js`).

---

## Getting started (local development)

### Prerequisites

- Node.js + npm

### Run the backend

```bash
cd backend
npm install
npm run dev
```

The backend runs with nodemon and starts the API server on port **5000**.

### Run the frontend

```bash
cd frontend
npm install
npm run dev
```

Vite starts the frontend dev server and prints the local URL in the terminal.

---

## Tech stack

- **Frontend:** React, Vite, Axios
- **Backend:** Node.js, Express, CORS
- **Database/ORM:** Prisma + SQLite (better-sqlite3 adapter)
- **PDF:** PDFKit

---

## Notes

- SQLite database files (`dev.db`) are present in the repository under `backend/` and `backend/prisma/`.
- For deeper frontend specifics, see `frontend/README.md`.

---

## Author

GitHub: [sriswasthik](https://github.com/sriswasthik)
