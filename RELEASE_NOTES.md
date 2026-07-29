# Release Notes

All notable changes to `@poluru-labs/enterprise-design-system-wc` are documented in this file.

Format inspired by [Keep a Changelog](https://keepachangelog.com/).  
Versioning follows [Semantic Versioning](https://semver.org/).

---

## [1.0.0] — 2026-07-22

Initial public release of the **Enterprise Design System** (Lit web components + Storybook).

**Author:** [Subrahmanyam Poluru](https://polurus.com) · Poluru Labs  
**LinkedIn:** [linkedin.com/in/polurus](https://www.linkedin.com/in/polurus/) · **Portfolio:** [polurus.com](https://polurus.com)

### Highlights

- Production-ready Lit 3 + TypeScript component library
- Token-driven theming (light + dark)
- Storybook 8 living style guide with Controls, Docs, a11y, themes, and interactions
- Copyable HTML snippets on every component story
- Custom Elements Manifest + Vitest smoke tests + ESLint

### Added

#### Foundations

- Design tokens: color, typography, spacing, radius, elevation, motion
- Dark theme via `eds-theme-dark` (Storybook theme switcher supported)
- Built-in icon set (`eds-icon`) with Storybook catalog
- Shared field / focus styles and utility helpers
- MDX docs: Introduction, Author, Tokens, Typography, Icons, Themes, Copy to clipboard

#### Components (alphabetical)

| Component | Tags |
| --- | --- |
| Accordion | `eds-accordion`, `eds-accordion-item` |
| Alert | `eds-alert` |
| Autocomplete | `eds-autocomplete` |
| Avatar | `eds-avatar` |
| Badge | `eds-badge` |
| Breadcrumb | `eds-breadcrumb`, `eds-breadcrumb-item` |
| Button | `eds-button` |
| Button Group | `eds-button-group` |
| Card | `eds-card` |
| Checkbox | `eds-checkbox` |
| Circular Progress | `eds-circular-progress` |
| Code Snippet | `eds-code-snippet` |
| Combobox | `eds-combobox` |
| Data Table | `eds-data-table` |
| Date Picker | `eds-date-picker` |
| Date Range Picker | `eds-date-range-picker` |
| Description List | `eds-description-list` |
| Divider | `eds-divider` |
| Drawer | `eds-drawer` |
| Dropdown Menu | `eds-dropdown-menu`, `eds-menu-item` |
| Empty State | `eds-empty-state` |
| File Upload | `eds-file-upload` |
| Icon | `eds-icon` |
| Input | `eds-input` |
| Kbd | `eds-kbd` |
| Link | `eds-link` |
| List | `eds-list`, `eds-list-item` |
| Meter | `eds-meter` |
| Modal | `eds-modal` |
| Number Input | `eds-number-input` |
| Pagination | `eds-pagination` |
| Pin Input | `eds-pin-input` |
| Popover | `eds-popover` |
| Progress Bar | `eds-progress-bar` |
| Radio Group | `eds-radio-group`, `eds-radio` |
| Rating | `eds-rating` |
| Search | `eds-search` |
| Segmented Control | `eds-segmented-control` |
| Select | `eds-select` |
| Side Nav | `eds-side-nav` |
| Skeleton | `eds-skeleton` |
| Slider | `eds-slider` |
| Spinner | `eds-spinner` |
| Split Button | `eds-split-button` |
| Stat | `eds-stat` |
| Status | `eds-status` |
| Stepper | `eds-stepper` |
| Switch | `eds-switch` |
| Tabs | `eds-tabs`, `eds-tab` |
| Tag | `eds-tag` |
| Textarea | `eds-textarea` |
| Time Picker | `eds-time-picker` |
| Timeline | `eds-timeline` |
| Toast | `eds-toast`, `eds-toast-host` (+ `showToast()`) |
| Toolbar | `eds-toolbar` |
| Tooltip | `eds-tooltip` |
| Tree View | `eds-tree-view`, `eds-tree-item` |
| Visually Hidden | `eds-visually-hidden` |

#### Tooling & DX

- Storybook addons: essentials, links, a11y, **themes**, **interactions**
- ESLint 9 flat config (TypeScript + Lit + WC plugins)
- Vitest + happy-dom unit tests for **all** components (coverage via `npm run test:coverage`)
- Custom Elements Manifest (`npm run cem` → `custom-elements.json`)
- Vite library build with declaration rollup
- Alphabetical Storybook component sidebar

### Scripts

| Command | Description |
| --- | --- |
| `npm run storybook` | Develop in Storybook |
| `npm run build` | Build library + CEM |
| `npm run test` | Run Vitest |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript check |
| `npm run cem` | Generate custom elements manifest |

### Upgrade notes

This is the first stable release. No migration path from prior versions.

---

## Unreleased

### Added

- Open-source packaging: LICENSE, CONTRIBUTING, SECURITY, CODE_OF_CONDUCT, CHANGELOG, CI, publishing guide
- Expanded JSDoc (`@element`, `@example`, params) on tokens, utils, date helpers, and components
- npm scripts: `verify`, `pack:check`, `release:check`, `prepublishOnly`

<!--
### Changed
### Deprecated
### Removed
### Fixed
### Security
-->
