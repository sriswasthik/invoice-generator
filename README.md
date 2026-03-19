# Invoice Generator

Invoice Generator is a full stack web app that helps you manage clients, create invoices, and generate invoice PDFs.
It has a React (Vite) frontend for the UI and a Node.js (Express) backend that exposes REST APIs.
Data is stored using Prisma with a SQLite database, and PDFs are produced on the server.

## Repository structure (high level)

At the root, the repository is organized as two separate apps:

```txt
invoice-generator/
  backend/    # Express API + Prisma + PDF generation
  frontend/   # React + Vite UI
```

Note: there is a default template README under `frontend/README.md` (React + Vite). This root README describes the actual project.

## Architecture overview

### Frontend (React + Vite)
The frontend is a single page app built with React and Vite. It is structured around pages (screens) and reusable UI components, and it talks to the backend using Axios.

Key concepts:
- `src/pages` contains the main route level screens (Dashboard, Clients, Create Invoice)
- `src/components` contains reusable building blocks (layout and cards)
- `src/api` centralizes API calls to the backend

### Backend (Node.js + Express + Prisma)
The backend exposes REST endpoints under `/api/*`, with a conventional separation of concerns:
- Routes define the URL paths and wire requests to controllers
- Controllers handle HTTP request/response logic
- Services encapsulate domain logic (invoice related logic)
- Utils include infrastructure helpers such as Prisma initialization and PDF generation

Prisma manages the schema and database access, using SQLite for storage.

## Detailed file structure

### Backend

```txt
backend/
  .gitignore
  package.json
  package-lock.json
  prisma.config.ts
  dev.db                  # local SQLite database file (present in repo)
  prisma/
    schema.prisma
    migrations/
    dev.db                # another SQLite db file under prisma/
  src/
    server.js             # Express entry point, mounts routes under /api
    controllers/
      clientController.js
      invoiceController.js
      paymentController.js
    routes/
      clientRoutes.js
      invoiceRoutes.js
      paymentRoutes.js
    services/
      invoiceService.js
    utils/
      prisma.js           # Prisma client setup
      pdfGenerator.js     # PDF generation logic (PDFKit)
      testInvoice.js      # test data / quick testing helper
```

Backend runtime notes:
- Server listens on port `5000` by default (see `backend/src/server.js`)
- API route groups:
  - `/api/invoices`
  - `/api/clients`
  - `/api/payments`

### Frontend

```txt
frontend/
  .gitignore
  index.html
  package.json
  package-lock.json
  vite.config.js
  eslint.config.js
  README.md               # Vite template README
  public/
    favicon.svg
    icons.svg
  src/
    main.jsx              # React bootstrap
    App.jsx               # App shell (wires pages/components)
    styles.css
    api/
      api.js              # Axios API client/helpers
    components/
      Layout.jsx
      InvoiceCard.jsx
      StatCard.jsx
    pages/
      Dashboard.jsx
      Clients.jsx
      CreateInvoice.jsx
```

## Tech stack

- Frontend: React, Vite, Axios
- Backend: Node.js, Express, CORS
- Database/ORM: Prisma + SQLite (better-sqlite3 adapter)
- PDF: PDFKit

## Setup and run (local)

### Prerequisites
- Node.js and npm installed

### 1) Backend
```bash
cd backend
npm install
npm run dev
```

The backend runs with nodemon and starts the API server on port 5000.

### 2) Frontend
```bash
cd frontend
npm install
npm run dev
```

Vite will start the frontend dev server (it will print the local URL in the terminal).

## Author

GitHub: [sriswasthik](https://github.com/sriswasthik)
