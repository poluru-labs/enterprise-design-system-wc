# Contributing to Enterprise Design System (Web Components)

Thanks for your interest in contributing to `@poluru-labs/enterprise-design-system-wc`.

## Development setup

```bash
git clone https://github.com/subrahmanyampoluru/enterprise-design-system-wc.git
cd enterprise-design-system-wc
npm install
npm run storybook   # http://localhost:6006
```

Node.js **20+** is required.

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run storybook` | Component playground + docs |
| `npm run test` | Vitest unit tests |
| `npm run test:coverage` | Coverage report under `coverage/` |
| `npm run lint` | ESLint (TypeScript + Lit + WC) |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run build` | Library bundle + Custom Elements Manifest |
| `npm run cem` | Regenerate `custom-elements.json` |
| `npm run verify` | typecheck + lint + test + build |
| `npm run release:check` | Full pre-publish verification |

## Project conventions

- **One folder per component** under `src/components/<name>/`
- Implementation file: `eds-<name>.ts` with `@customElement('eds-…')`
- Colocated tests: `eds-<name>.test.ts`
- Stories: `*.stories.ts` with copyable HTML snippets
- Prefer design tokens (`--eds-*`) over hard-coded values
- Public APIs should include **JSDoc** (`@slot`, `@fires`, `@example` where useful)

## Pull requests

1. Create a focused branch from `main`
2. Keep changes scoped (one component / one concern when possible)
3. Add or update unit tests for behavior changes
4. Run `npm run verify` before opening the PR
5. Update `CHANGELOG.md` under **Unreleased** when user-facing behavior changes
6. Describe *why* in the PR body; link related issues

## Coding standards

- TypeScript strict mode
- Lit 3 reactive properties / events
- Accessible names, roles, and keyboard behavior for interactive controls
- No secrets or credentials in the repo

## Reporting issues

Use GitHub Issues with:

- Package version
- Browser / Node version
- Minimal reproduction (HTML or Storybook steps)
- Expected vs actual behavior

## Code of conduct

See [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md).
