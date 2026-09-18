# Architecture

Helix Analytics is a hash-routed single-page template. There is no backend. Sample
metrics live in `src/data/index.js`.

## Source map

| File | Role |
| --- | --- |
| `index.html` | Document shell, meta, fonts, skip link |
| `src/main.js` | Bootstrap import, app boot, hash routing |
| `src/components/app-shell.js` | Shell markup, drawers, modals, global handlers |
| `src/components/app-header.js` | Insight ribbon header (refresh clock, anomalies, Ask Helix) |
| `src/components/app-sidebar.js` | Side navigation and workspace identity |
| `src/components/content-card.js` | `hx-content-card` equal-height card wrapper |
| `src/components/widgets.js` | Page header, metric strip, sparkline helpers |
| `src/pages/index.js` | Core views and per-route hydration |
| `src/pages/features.js` | Goals, forecasts, sources, usage, team, lineage, collections, jobs |
| `src/pages/insights.js` | Watchlist, anomalies, quality, Ask, subscriptions, audit |
| `src/pages/search.js` | Workspace search results page |
| `src/data/index.js` | Fictional workspace, reports, SQL, nav, search groups |
| `src/lib/router.js` | Hash route helpers |
| `src/lib/format.js` | Date, number, currency formatters |
| `src/lib/search.js` | Query normalization and record filtering |
| `src/lib/status.js` | Status and severity tone mapping |
| `src/styles/tokens.css` | Brand token overrides (`#DA0037`) |
| `src/styles/layout.css` | Shell grid, stretch rows, equal-height cards |
| `src/styles/header.css` | Insight ribbon header styles |
| `src/test/setup.js` | Vitest + jsdom design-system import |
| `vite.config.js` | Relative `base`, ports 5173/4173, Vitest |

## Routing

`window.location.hash` selects a route from `routes` in `src/data/index.js`.
`hashchange` re-renders `#view` and refreshes `eds-side-nav` plus
`eds-breadcrumb`. Unknown hashes fall back to Overview.

## State

`viewState` in `src/pages/index.js` holds catalog page, search text, selected range,
and the Explorer tree selection. Shell overlays (`eds-drawer`, `eds-modal`)
stay mounted so any view can open them.

## Design-system integration

```js
import '@poluru-labs/enterprise-design-system-wc/tokens.css';
import '@poluru-labs/enterprise-design-system-wc';
import { showToast, setDensity, todayISO, formatCount } from '@poluru-labs/enterprise-design-system-wc';
```

Array and object properties (`items`, `columns`, `rows`, `options`, `steps`)
are assigned in JavaScript after the view HTML is inserted. Scalar attributes
can stay in markup.

## Layout

The shell is a two-column CSS grid with a sticky insight-ribbon header. Bootstrap
supplies the responsive `row` / `col-*` system inside each view. `stretch-row`
and `hx-content-card` keep insight and report cards equal height across 4/6/8
card grids.

## Tests

Vitest runs unit tests for `src/lib/*` and component smoke tests for the header
and content card. Run `npm test` before shipping changes.
