# Enterprise Design Systems (Web Components)

Token-driven enterprise UI library built with **Lit 3**, **TypeScript**, and **Storybook**.

**Author:** [Subrahmanyam Poluru](https://github.com/poluru-labs) 

| Doc | Link |
| --- | --- |
| Changelog | [CHANGELOG.md](./CHANGELOG.md) |
| Release notes | [RELEASE_NOTES.md](./RELEASE_NOTES.md) |
| Contributing | [CONTRIBUTING.md](./CONTRIBUTING.md) |
| Publishing | [docs/PUBLISHING.md](./docs/PUBLISHING.md) |
| Security | [SECURITY.md](./SECURITY.md) |
| Code of conduct | [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md) |

## Features

- Lit 3 custom elements (`eds-*`) with TypeScript types
- Design tokens (color, typography, spacing, radius, elevation, motion) + **dark theme**
- Storybook 8 with Controls, Docs, a11y, themes, interactions, and copyable HTML snippets
- Custom Elements Manifest (`custom-elements.json`) for IDE / docs tooling
- Vitest component unit tests with coverage thresholds
- JSDoc on public components, tokens, and helpers (`@element`, `@slot`, `@fires`, `@example`)

## Install

```bash
npm install @poluru-labs/enterprise-design-system-wc
```

Peer/runtime: **Lit ^3.2** (also bundled as a dependency for convenience).

## Quick start (consumer)

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>EDS</title>
    <!-- Bundlers resolve this export; or copy/link the CSS from node_modules -->
    <link rel="stylesheet" href="/node_modules/@poluru-labs/enterprise-design-system-wc/src/tokens/index.css" />
    <script type="module">
      import '@poluru-labs/enterprise-design-system-wc';
    </script>
  </head>
  <body>
    <eds-button variant="primary">Continue</eds-button>
  </body>
</html>
```

With a bundler:

```ts
import '@poluru-labs/enterprise-design-system-wc/tokens.css';
import '@poluru-labs/enterprise-design-system-wc';
import { tokens, showToast, EdsButton } from '@poluru-labs/enterprise-design-system-wc';

showToast({ title: 'Saved', variant: 'success' });
```

Dark theme: add class `eds-theme-dark` on `html` or `body` (Storybook theme toolbar does the same).

## Framework integration

Storybook → **Integration** sidebar:

| Guide | Covers |
| --- | --- |
| Overview | Install, tokens, registration, events, themes |
| Angular | `CUSTOM_ELEMENTS_SCHEMA`, template bindings, bootstrapping |
| React | Root import, refs / custom events, JSX typing |
| Vue | `isCustomElement`, SFC bindings, `v-model` bridge |

## Local development

```bash
git clone https://github.com/poluru-labs/enterprise-design-system-wc.git
cd enterprise-design-system-wc
npm install
npm run storybook   # http://localhost:6006
```

## Folder structure

```text
enterprise-design-system-wc/
├── .github/workflows/          # CI
├── .storybook/                 # Storybook config
├── docs/                       # Publishing & contributor docs
├── public/                     # Static Storybook assets
├── src/
│   ├── components/             # One folder per component
│   ├── docs/                   # MDX documentation
│   ├── foundations/            # Global & shared Lit styles
│   ├── tokens/                 # CSS + TS design tokens (+ dark theme)
│   ├── utils/                  # Shared helpers
│   └── index.ts                # Public entry
├── custom-elements.json
├── package.json
└── vite.config.ts
```

## Components

| Tag | Description |
| --- | --- |
| `eds-accordion` / `eds-accordion-item` | Accordion |
| `eds-alert` | Inline alerts |
| `eds-autocomplete` | Free-text suggestions |
| `eds-avatar` | Avatar |
| `eds-badge` | Status / count badge |
| `eds-breadcrumb` / `eds-breadcrumb-item` | Breadcrumb |
| `eds-button` | Primary / secondary / tertiary / danger button |
| `eds-button-group` | Attached button group |
| `eds-card` | Card |
| `eds-checkbox` | Checkbox with indeterminate |
| `eds-circular-progress` | Circular progress |
| `eds-code-snippet` | Copyable code panel |
| `eds-combobox` | Filterable select |
| `eds-data-table` | Data table |
| `eds-date-picker` | Single date calendar |
| `eds-date-range-picker` | Date range calendar |
| `eds-description-list` | Description list (dl/dt/dd) |
| `eds-divider` | Divider (optional label) |
| `eds-drawer` | Side drawer |
| `eds-dropdown-menu` / `eds-menu-item` | Dropdown menu |
| `eds-empty-state` | Empty / no-data state |
| `eds-file-upload` | File upload |
| `eds-icon` | Built-in SVG icon set |
| `eds-input` | Text field with label, hint, validation, icons |
| `eds-kbd` | Keyboard shortcut |
| `eds-link` | Text link |
| `eds-list` / `eds-list-item` | List |
| `eds-meter` | Meter / gauge |
| `eds-modal` | Modal dialog |
| `eds-number-input` | Numeric field with steppers |
| `eds-pagination` | Pagination |
| `eds-pin-input` | OTP / PIN input |
| `eds-popover` | Popover |
| `eds-progress-bar` | Linear progress |
| `eds-radio-group` / `eds-radio` | Radio group |
| `eds-rating` | Star rating |
| `eds-search` | Search field with clear |
| `eds-segmented-control` | Segmented control |
| `eds-select` | Select with options API |
| `eds-side-nav` | App side navigation |
| `eds-skeleton` | Skeleton loader |
| `eds-slider` | Range slider |
| `eds-spinner` | Loading spinner |
| `eds-split-button` | Split button + menu |
| `eds-stat` | KPI / metric display |
| `eds-status` | Status dot + label |
| `eds-stepper` | Multi-step indicator |
| `eds-switch` | Toggle switch |
| `eds-tabs` / `eds-tab` | Tabs |
| `eds-tag` | Dismissible tag / chip |
| `eds-textarea` | Multi-line text field |
| `eds-time-picker` | Time input (HH:MM) |
| `eds-timeline` | Vertical timeline |
| `eds-toast` / `eds-toast-host` | Toasts (+ `showToast()`) |
| `eds-toolbar` | App toolbar |
| `eds-tooltip` | Tooltip |
| `eds-tree-view` / `eds-tree-item` | Tree view |
| `eds-visually-hidden` | Screen-reader-only content |

## Scripts

| Command | Description |
| --- | --- |
| `npm run storybook` | Start Storybook |
| `npm run build-storybook` | Static Storybook build |
| `npm run build` | Build library + CEM |
| `npm run test` | Run Vitest |
| `npm run test:coverage` | Vitest with V8 coverage |
| `npm run cem` | Generate `custom-elements.json` |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript check |
| `npm run verify` | typecheck + lint + test + build |
| `npm run release:check` | Full pre-publish verification |
| `npm run pack:check` | `npm pack --dry-run` |

## Design tokens

```css
@import '@poluru-labs/enterprise-design-system-wc/tokens.css';
```

Typed mirror:

```ts
import { tokens, color, spacing } from '@poluru-labs/enterprise-design-system-wc';
```

## Publishing

Maintainers: see [docs/PUBLISHING.md](./docs/PUBLISHING.md).

```bash
npm run release:check
npm publish --access public
```

## License

MIT © Subrahmanyam Poluru
