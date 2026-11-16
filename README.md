# Pulse — Admin Dashboard

A responsive admin dashboard built with React, Vite, Tailwind CSS, and Recharts. Designed to handle dense operational views—KPI sparklines, multi-timeframe revenue charts, acquisition breakdowns, and a full-featured order management table—with persistent light and dark themes.

## Features

- **Theme Persistence** — Class-based dark/light mode synced with `localStorage` and OS color-scheme preferences via React Context (`ThemeContext`).
- **Collapsible Navigation Shell** — Responsive sidebar that collapses into an icon-only rail, paired with a sticky top header featuring live global search, a notification popover with unread tracking, and a user menu.
- **KPI Overview Cards** — Metric cards displaying current totals, context-aware trend badges (e.g., rising system alerts flagged in red), and inline Recharts sparklines.
- **Interactive Analytics** — Switchable `7d` / `30d` / `12m` area chart comparing revenue and order volume, alongside an acquisition channel donut chart with synchronized legend hover highlighting.
- **Order Management Table** — Client-side search across customer names and order IDs, status filter tabs (`All`, `Paid`, `Pending`, `Refunded`, `Cancelled`), multi-column sorting, pagination, bulk actions (mark as paid / delete), and filtered CSV export.

## Tech Stack

- **Framework:** React 18 + Vite 5
- **Styling:** Tailwind CSS 3
- **Charts:** Recharts 2
- **Icons:** Lucide React

## Project Structure

```text
data-heavy-admin-dashboard/
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── context/
    │   └── ThemeContext.jsx
    ├── components/
    │   ├── layout/
    │   │   ├── Sidebar.jsx
    │   │   └── Header.jsx
    │   └── dashboard/
    │       ├── MetricCard.jsx
    │       ├── AnalyticsCharts.jsx
    │       └── DataTable.jsx
    └── data/
        └── mockDashboardData.js
```

## Getting Started

Requires Node.js 18+.

```bash
# Install dependencies
npm install

# Start local dev server (http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Customization

- **Connecting a Backend:** Replace the mock exports in `src/data/mockDashboardData.js` with API queries (e.g., `fetch` or TanStack Query). All dashboard components accept plain arrays and objects matching those shapes.
- **Theme & Status Tokens:** Brand colors are configured under `brand` in `tailwind.config.js`, and order status badge styles live in `statusStyles` inside `src/data/mockDashboardData.js`.
