# @poluru-labs/enterprise-design-system-wc

Token-driven enterprise UI library built with **Lit 3**, **TypeScript**, and **Storybook**. Framework-agnostic custom elements (`eds-*`) with design tokens, dark theme, and TypeScript types.

## Demo


Live Demo: [enterprise-design-system-wc](https://polurus.com/enterprise-design-system-wc/?path=/docs/introduction--documentation)

## Playground

Try it here: [enterprise-design-system-wc](https://polurus.com/enterprise-design-system-wc/?path=/docs/introduction--documentation)

[![npm version](https://img.shields.io/npm/v/@poluru-labs/enterprise-design-system-wc.svg)](https://www.npmjs.com/package/@poluru-labs/enterprise-design-system-wc)
[![npm downloads](https://img.shields.io/npm/dm/@poluru-labs/enterprise-design-system-wc.svg)](https://www.npmjs.com/package/@poluru-labs/enterprise-design-system-wc)
[![License: MIT](https://img.shields.io/npm/l/@poluru-labs/enterprise-design-system-wc.svg)](https://github.com/poluru-labs/enterprise-design-system-wc/blob/main/LICENSE)
[![CI](https://github.com/poluru-labs/enterprise-design-system-wc/actions/workflows/ci.yml/badge.svg)](https://github.com/poluru-labs/enterprise-design-system-wc/actions/workflows/ci.yml)

## Install

```bash
npm install @poluru-labs/enterprise-design-system-wc
```

Requires **Node.js 20+**. Depends on **Lit ^3.2** (included as a dependency).

```bash
# optional: yarn / pnpm
yarn add @poluru-labs/enterprise-design-system-wc
pnpm add @poluru-labs/enterprise-design-system-wc
```

## Usage

### Bundler (recommended)

```ts
import '@poluru-labs/enterprise-design-system-wc/tokens.css';
import '@poluru-labs/enterprise-design-system-wc';
import { tokens, showToast } from '@poluru-labs/enterprise-design-system-wc';

showToast({ title: 'Saved', variant: 'success' });
```

```html
<eds-button variant="primary">Continue</eds-button>
```

### Package exports

| Import | What you get |
| --- | --- |
| `@poluru-labs/enterprise-design-system-wc` | Components, typed tokens helpers, utilities |
| `@poluru-labs/enterprise-design-system-wc/tokens.css` | Design tokens CSS (light + dark) |
| `@poluru-labs/enterprise-design-system-wc/custom-elements.json` | Custom Elements Manifest |

### Dark theme

Add class `eds-theme-dark` on `html` or `body`:

```html
<html class="eds-theme-dark">
```

### Design tokens

```css
@import '@poluru-labs/enterprise-design-system-wc/tokens.css';
```

```ts
import { tokens, color, spacing } from '@poluru-labs/enterprise-design-system-wc';
```

## Features

- Lit 3 custom elements with TypeScript types
- Design tokens: color, typography, spacing, radius, elevation, motion
- Light + dark themes
- Custom Elements Manifest for IDE / docs tooling
- Accessible defaults (focus, keyboard, ARIA)
- Works in plain HTML, Angular, React, and Vue

## Framework notes

| Stack | Tip |
| --- | --- |
| **HTML** | Load `tokens.css`, then import the package as a module |
| **Angular** | Add `CUSTOM_ELEMENTS_SCHEMA`; import the package once at bootstrap |
| **React** | Import once at the app root; listen to custom events with refs / `addEventListener` |
| **Vue** | Mark `eds-*` as custom elements via `compilerOptions.isCustomElement` |

Full guides live in the [GitHub repo](https://github.com/poluru-labs/enterprise-design-system-wc) Storybook **Integration** docs.

## Components

50+ `eds-*` elements, including:

`eds-button`, `eds-input`, `eds-select`, `eds-checkbox`, `eds-switch`, `eds-tabs`, `eds-modal`, `eds-drawer`, `eds-toast`, `eds-data-table`, `eds-date-picker`, `eds-accordion`, `eds-alert`, `eds-avatar`, `eds-badge`, `eds-card`, `eds-combobox`, `eds-dropdown-menu`, `eds-pagination`, `eds-progress-bar`, `eds-slider`, `eds-tooltip`, `eds-tree-view`, and more.

See the [component list on GitHub](https://github.com/poluru-labs/enterprise-design-system-wc#components) or run Storybook locally.

## Browser support

Modern evergreen browsers with native Custom Elements / ES modules (Chrome, Firefox, Safari, Edge).

## Documentation

| Resource | Link |
| --- | --- |
| GitHub | https://github.com/poluru-labs/enterprise-design-system-wc |
| Changelog | https://github.com/poluru-labs/enterprise-design-system-wc/blob/main/CHANGELOG.md |
| Contributing | https://github.com/poluru-labs/enterprise-design-system-wc/blob/main/CONTRIBUTING.md |
| Support | https://github.com/poluru-labs/enterprise-design-system-wc/blob/main/SUPPORT.md |
| Security | https://github.com/poluru-labs/enterprise-design-system-wc/blob/main/SECURITY.md |

### Local Storybook

```bash
git clone https://github.com/poluru-labs/enterprise-design-system-wc.git
cd enterprise-design-system-wc
npm install
npm run storybook
```

Open http://localhost:6006

## Author

**[Subrahmanyam Poluru](https://polurus.com)** — Poluru Labs

Design systems architect and product engineer. Builds token-driven component libraries and documentation platforms for enterprise teams.

- Portfolio: [polurus.com](https://polurus.com)
- LinkedIn: [linkedin.com/in/polurus](https://www.linkedin.com/in/polurus/)
- GitHub: [github.com/poluru-labs](https://github.com/poluru-labs)
- npm: [@poluru-labs/enterprise-design-system-wc](https://www.npmjs.com/package/@poluru-labs/enterprise-design-system-wc)

## License

[MIT](https://github.com/poluru-labs/enterprise-design-system-wc/blob/main/LICENSE) © [Subrahmanyam Poluru](https://polurus.com) 

See [NOTICE](https://github.com/poluru-labs/enterprise-design-system-wc/blob/main/NOTICE) and [AUTHORS](https://github.com/poluru-labs/enterprise-design-system-wc/blob/main/AUTHORS).

## Issues

Bugs and feature requests: [GitHub Issues](https://github.com/poluru-labs/enterprise-design-system-wc/issues)  
Security reports: [SECURITY.md](https://github.com/poluru-labs/enterprise-design-system-wc/blob/main/SECURITY.md) (private disclosure)
