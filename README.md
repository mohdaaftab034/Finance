# FinTrack Finance Dashboard

FinTrack is a responsive single-page finance dashboard application built with React, Tailwind CSS, Recharts, and Zustand.

This repository currently contains the frontend application in the `frontend/` directory.

## Project Structure

```text
Finance/
├── frontend/        # React + Vite app
└── README.md        # Project-level documentation
```

## Frontend Overview

The frontend app includes:

- Dashboard view with summary metrics and charts
- Transactions management with filters, pagination, and export
- Insights page with financial analytics
- Role-based UI (Admin and Viewer)
- Light/Dark mode
- Local persistence using Zustand + localStorage

## Tech Stack

- React
- Vite
- Tailwind CSS
- Zustand
- Recharts
- React Router
- date-fns
- lucide-react
- react-hot-toast

## Getting Started

Run commands from the `frontend/` directory.

1. Install dependencies:

```bash
cd frontend
npm install
```

2. Start development server:

```bash
npm run dev
```

3. Build for production:

```bash
npm run build
```

4. Preview production build:

```bash
npm run preview
```

## Available Scripts (frontend)

- `npm run dev` - Start Vite development server
- `npm run build` - Create production build
- `npm run preview` - Preview production build locally

## Notes

- This project uses mock/local data and does not require a backend.
- Application state such as filters, role, and UI preferences is persisted in localStorage.
