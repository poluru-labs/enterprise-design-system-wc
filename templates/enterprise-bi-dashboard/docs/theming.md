# Theming

## Brand

The product color is **`#DA0037`** on a **light** canvas.

`src/style.css` remaps the EDS brand scale and semantic aliases:

| Token | Value |
| --- | --- |
| `--eds-color-brand-600` / `--bi-brand` | `#DA0037` |
| `--eds-color-brand-700` | `#B3002C` |
| `--eds-color-brand-50` | `#FEEAEE` |
| `--eds-color-bg` / `--bi-wash` | `#FFF7F8` |
| `--bi-canvas` | `#fffbfc` |
| `--eds-color-primary` | `#DA0037` |
| `--eds-shadow-focus` | crimson focus ring |

Keep the document `color-scheme` as `light`. This template is not a dark-first
product. The design system still supports `.eds-theme-dark` if a consumer
opts in later.

## Density

`setDensity('comfortable')` runs at boot. Settings exposes a compact switch
that writes `data-eds-density` on `<html>`.

## Fonts

Runtime fonts match EDS tokens:

- Source Sans 3 — UI
- Source Serif 4 — display headings
- IBM Plex Mono — SQL and legal code

They are loaded from Google Fonts in `index.html` and attributed in `NOTICE`
under the SIL Open Font License.

## Rebranding

Change `--eds-color-brand-*` and `--bi-*` in `src/style.css`, then update
`theme-color` in `index.html` and the favicon fill in `public/favicon.svg`.
