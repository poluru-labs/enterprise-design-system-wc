/**
 * Shared formatting helpers for design-system consumers and components.
 * @module
 */

/**
 * Clamp a numeric value to the inclusive range `[min, max]`.
 * Prefer this helper at form-oriented call sites.
 *
 * @param value - Input number
 * @param min - Lower bound (inclusive)
 * @param max - Upper bound (inclusive)
 */
export function clampNumber(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Format a count for compact UI (e.g. badges): `999`, `1.2k`, `3M`.
 *
 * @param value - Non-negative count
 * @returns Human-readable compact string
 */
export function formatCount(value: number): string {
  if (value < 1000) return String(value);
  if (value < 1_000_000) return `${(value / 1000).toFixed(value % 1000 === 0 ? 0 : 1)}k`;
  return `${(value / 1_000_000).toFixed(value % 1_000_000 === 0 ? 0 : 1)}M`;
}

/**
 * Global UI density modes. Applied via `data-eds-density` on `<html>`.
 */
export type EdsDensity = 'comfortable' | 'compact';

/**
 * Apply density on `document.documentElement` for global density tokens.
 *
 * @param density - Comfortable (default spacing) or compact
 *
 * @example
 * ```ts
 * setDensity('compact');
 * ```
 */
export function setDensity(density: EdsDensity): void {
  document.documentElement.dataset.edsDensity = density;
}
