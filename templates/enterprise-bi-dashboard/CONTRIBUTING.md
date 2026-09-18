# Contributing

Thanks for helping improve the Enterprise BI Dashboard template.

## Ground rules

- Keep the default theme **light** with brand **`#DA0037`**.
- Prefer `@poluru-labs/enterprise-design-system-wc` (`eds-*`) over one-off widgets.
- Do not add analytics trackers, real credentials, or copyrighted third-party
  datasets.
- Keep documentation and legal files in sync when you add a dependency.

## Local setup

```bash
cd enterprise-bi-dashboard
npm install
npm run dev
```

Requires **Node.js 20+**.

## Pull requests

1. Describe the user-facing change and the components you used.
2. Update `docs/` and `CHANGELOG.md` when behavior changes.
3. Run `npm run build` and confirm it completes without errors.
4. Do not commit `node_modules/`, `.env`, or `dist/`.

## Code of conduct

Participation is governed by [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md).
