# FinTrack Finance Dashboard SPA

A production-style, fully responsive single-page finance dashboard built with React, Tailwind CSS, Recharts, and Zustand. The app supports role-based UI (Admin/Viewer), advanced filtering, export utilities, dark mode, and local persistence with no backend required.

## Screenshots

- Dashboard overview: _add screenshot here_
- Transactions with filters and modals: _add screenshot here_
- Insights analytics view: _add screenshot here_

## Tech Stack

- React 18+ (functional components + hooks)
- React Router v6
- Tailwind CSS v3
- Recharts
- Zustand with `persist` middleware
- date-fns
- lucide-react icons
- react-hot-toast notifications
- localStorage persistence

## Installation

1. Install dependencies:

```bash
npm install
```

2. Run in development mode:

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

## Features by Page

### Dashboard (`/`)

- 4 summary cards: total balance, income, expenses, savings rate
- Count-up number animation and trend vs previous month
- Income vs expenses 6-month trend chart
- Expense category pie chart with legend and hover interaction
- Recent transactions table with quick navigation to full list

### Transactions (`/transactions`)

- Role-based Add button (Admin only)
- Advanced filter system:
  - Text search
  - Single category and multi-select category filters
  - Type filter
  - Date range
  - Amount min/max range
  - Sorting by date/amount/category and sort direction
- Filter chips with individual clear actions
- Responsive data rendering:
  - Desktop table
  - Mobile stacked cards
- Edit/Delete actions with delete confirmation (Admin only)
- Add/Edit transaction modals with validation
- Export filtered data as CSV or JSON
- Pagination with row summary

### Insights (`/insights`)

- Key insight cards:
  - Highest spending category
  - Best savings month
  - Biggest single expense
- Monthly grouped income vs expenses chart
- Category spending horizontal breakdown chart
- Expense trend area chart
- Summary strip with best/worst month and average savings

## RBAC (Role-Based Access Control)

Role switching is available in the top bar via the RoleSwitcher.

- Admin:
  - Can add new transactions
  - Can edit and delete transactions
  - Sees Admin badge styling
- Viewer:
  - Read-only access
  - Cannot add/edit/delete transactions
  - Sees Viewer badge styling

The role is persisted in localStorage and survives refresh.

## State Management Approach

Zustand (`src/store/useFinanceStore.js`) is used as the single source of truth for:

- transactions
- role
- filters
- dark mode

Actions are colocated in the store for clarity and scalability. Persistence is implemented using `zustand/middleware` `persist`, so app state remains stable across sessions.

## Folder Structure

```text
src/
├── components/
│   ├── layout/
│   ├── dashboard/
│   ├── transactions/
│   ├── insights/
│   └── ui/
├── pages/
├── store/
├── data/
├── hooks/
├── utils/
├── App.jsx
└── main.jsx
```

## Design Decisions and Trade-offs

- Zustand chosen over Context+Reducer for simpler APIs and cleaner persistence.
- Recharts selected for quick composable charting and responsive behavior.
- Filter logic centralized in custom hook (`useFilteredTransactions`) for reuse and testability.
- Insights are derived (not stored) in `useInsights` to avoid duplicated state.
- Mobile-first responsive behavior prioritizes card layout for dense transaction data.
- Toast system uses `react-hot-toast` for lightweight reliable notifications.

## Future Improvements

- Unit and integration tests for hooks and data workflows
- Virtualized transaction rows for very large datasets
- Dynamic theming with design tokens
- Import transactions from CSV bank statements
- Multi-account support and category budgeting targets
- Offline-ready PWA support
