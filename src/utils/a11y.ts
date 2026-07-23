/**
 * Accessibility helpers shared across Enterprise Design Systems components.
 * @module
 */

/**
 * CSS text that visually hides an element while keeping it available to
 * assistive technology (screen readers).
 *
 * @returns A CSS declaration block suitable for inline `style` or Lit `css`.
 *
 * @example
 * ```ts
 * html`<span style=${visuallyHiddenStyles()}>Loading</span>`;
 * ```
 */
export function visuallyHiddenStyles(): string {
  return `
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  `;
}

/**
 * Clamp a numeric value to the inclusive range `[min, max]`.
 *
 * @param value - Input number
 * @param min - Lower bound (inclusive)
 * @param max - Upper bound (inclusive)
 * @returns The nearest value within the range
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
