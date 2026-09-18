# Enterprise BI Dashboard

Helix Analytics is a Vite + Bootstrap workspace template for enterprise analytics. It
uses every published surface of
[`@poluru-labs/enterprise-design-system-wc`](https://www.npmjs.com/package/@poluru-labs/enterprise-design-system-wc)
on a **light background** with brand **`#DA0037`**.

[![License: MIT](https://img.shields.io/badge/License-MIT-DA0037.svg)](./LICENSE)
[![Node.js 20+](https://img.shields.io/badge/node-%3E%3D20-1a2430.svg)](./package.json)

## Screeshot

<img width="3360" height="3572" alt="image" src="https://github.com/user-attachments/assets/61e287f7-d443-4d0d-adb7-92de80d78332" />


## Features

- Insight ribbon header with live refresh clock, anomaly badge, and Ask Helix console search
- App shell with side navigation, breadcrumbs, ⌘K jump-to palette, subscriptions link, and profile menu
- Overview KPIs, bookmarks, goal snapshot, regional mix, certified sources, pipeline health, and activity
- Report catalog with search, autocomplete, combobox, date range, tags, table, and pagination
- Workspace search page grouping reports, insights, people, and platform objects
- Explorer with folder tree, workbook list, tabs, SQL snippet, and lineage accordion
- Query lab with stepper, SQL authoring, limits, schedule, PIN publish gate, and file upload
- Goals, forecasts, sources, usage, team, watchlist (8 metrics), anomalies, quality, and Ask
- Equal-height card grids via `hx-content-card` and `stretch-row` layouts
- Subscriptions and audit log for deliveries and access
- Query lab results table after run; report subscribe jumps to deliveries
- Inbox drawer, alerts with rating, popover, modal create flow, and toast confirmations
- Settings for profile, density, live refresh, and accessibility helpers
- Vitest unit tests for format, search, status helpers and component smoke tests
- In-app Legal page plus LICENSE, NOTICE, AUTHORS, COPYRIGHT, and security policy

## Quick start

Requires **Node.js 20+**.

```bash
cd enterprise-bi-dashboard
npm install
npm run dev
```

Open the URL Vite prints (default http://localhost:5173). Routes are hash-based:

| Route | View |
| --- | --- |
| `#/overview` | KPI workspace |
| `#/search` | Workspace search |
| `#/reports` | Catalog and filters |
| `#/explorer` | Folders, SQL, lineage |
| `#/query` | Author and publish |
| `#/goals` | OKR progress |
| `#/forecasts` | Six-month scenarios |
| `#/sources` | Connector health |
| `#/usage` | Warehouse spend |
| `#/team` | Analysts and roles |
| `#/watchlist` | Live followed metrics |
| `#/anomalies` | Detection feed |
| `#/quality` | Tests and freshness |
| `#/ask` | Natural-language questions |
| `#/subscriptions` | Email and Slack deliveries |
| `#/audit` | Access log |
| `#/alerts` | Monitors |
| `#/settings` | Preferences |
| `#/legal` | Copyright and notices |

```bash
npm run build
npm run preview
npm test
```

## Brand

Default theme is light. Brand tokens in `src/styles/tokens.css` remap the design-system
teal scale to `#DA0037` and a rose-tinted canvas `#FFF7F8`.

See [docs/theming.md](./docs/theming.md).

## Documentation

| Guide | Description |
| --- | --- |
| [Getting started](./docs/getting-started.md) | Install, scripts, environment |
| [Architecture](./docs/architecture.md) | Files, routing, state |
| [Components](./docs/components.md) | `eds-*` coverage map |
| [Theming](./docs/theming.md) | Brand tokens and density |
| [Accessibility](./docs/accessibility.md) | Keyboard, ARIA, skip link |
| [Legal](./docs/legal.md) | Copyright, MIT, third parties |

## Stack

- `@poluru-labs/enterprise-design-system-wc` — Lit custom elements and tokens
- Bootstrap 5 — responsive grid
- Bootstrap Icons — chart and layout glyphs
- Vite 7 — development server and production build

## Author

**[Subrahmanyam Poluru](https://polurus.com)** — Poluru Labs

- Portfolio: [polurus.com](https://polurus.com)
- LinkedIn: [linkedin.com/in/polurus](https://www.linkedin.com/in/polurus/)
- GitHub: [github.com/poluru-labs](https://github.com/poluru-labs)

## License

[MIT](./LICENSE) © 2026 [Subrahmanyam Poluru](https://polurus.com) / Poluru Labs

See [NOTICE](./NOTICE), [AUTHORS](./AUTHORS), [COPYRIGHT](./COPYRIGHT), and
[SECURITY.md](./SECURITY.md). Demo metrics are fictional.
