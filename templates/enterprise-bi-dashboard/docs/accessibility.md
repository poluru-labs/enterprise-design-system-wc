# Accessibility

The design-system components ship keyboard support, focus rings, and ARIA
defaults. This template adds workspace-level helpers.

## Page structure

- Skip link targets `#view`
- One `h1` per route
- Landmark: `aside` for navigation, `main` for the active view
- Decorative charts use `aria-hidden` or an explicit `aria-label`

## Keyboard

| Control | Behavior |
| --- | --- |
| Tab | Moves through toolbar, nav, and view controls |
| Enter / Space | Activates `eds-button` and menu items |
| Escape | Closes `eds-modal` and `eds-drawer` |
| ⌘ Enter (documented) | Suggested run shortcut in Query lab |

## Color

Brand `#DA0037` is used on white or `#FFF7F8` surfaces. Status colors come from
EDS semantic tokens (`success`, `warning`, `danger`, `info`) and are never the
only indicator — labels travel with `eds-status` and `eds-badge`.

## Assistive text

`eds-visually-hidden` on Settings restates the brand and theme for
screen-reader users. Icon-only toolbar buttons set `accessible-label`.
