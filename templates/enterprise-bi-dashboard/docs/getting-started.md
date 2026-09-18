# Getting started

## Requirements

- Node.js 20 or later
- npm 10 or later (comes with current Node installers)

## Install

From the repository root:

```bash
cd enterprise-bi-dashboard
npm install
```

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Vite development server with hot reload |
| `npm run build` | Production bundle in `dist/` |
| `npm run preview` | Serve the production bundle locally |

Optional environment keys are listed in [`.env.example`](../.env.example). This
template does not require secrets to run.

## First run checklist

1. Confirm the sidebar brand mark is crimson `#DA0037` on a light canvas.
2. Walk Overview → Reports → Explorer → Query lab → Alerts → Settings → Legal.
3. Use **Export pack**, **Filters**, and **New alert** to exercise toasts, the
   drawer, and the modal.
4. Toggle **Compact density** on Settings.

## Updating the design system

```bash
npm install @poluru-labs/enterprise-design-system-wc@latest
```

After an upgrade, compare `docs/components.md` with the package README and
Custom Elements Manifest so new `eds-*` tags can be wired into a view.
