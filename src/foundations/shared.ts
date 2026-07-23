import { css } from 'lit';

/** Shared focus ring used across interactive components. */
export const focusRing = css`
  &:focus-visible {
    outline: none;
    box-shadow: var(--eds-shadow-focus);
  }
`;

/** Base reset for host elements. */
export const hostBase = css`
  :host {
    display: inline-block;
    box-sizing: border-box;
    font-family: var(--eds-font-sans);
    color: var(--eds-color-text);
    -webkit-font-smoothing: antialiased;
  }

  :host([hidden]) {
    display: none !important;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
`;

/** Shared field chrome for text-like controls. */
export const fieldStyles = css`
  .field {
    display: flex;
    flex-direction: column;
    gap: var(--eds-space-2);
    width: 100%;
  }

  .label {
    font-size: var(--eds-font-size-sm);
    font-weight: var(--eds-font-weight-semibold);
    color: var(--eds-color-text);
  }

  .hint,
  .error {
    font-size: var(--eds-font-size-xs);
    line-height: var(--eds-line-height-normal);
  }

  .hint {
    color: var(--eds-color-text-subtle);
  }

  .error {
    color: var(--eds-color-danger-600);
  }

  .control {
    display: flex;
    align-items: center;
    width: 100%;
    min-height: 2.5rem;
    padding: 0 var(--eds-space-3);
    border: 1px solid var(--eds-color-border-strong);
    border-radius: var(--eds-radius-md);
    background: var(--eds-color-surface);
    color: var(--eds-color-text);
    font: inherit;
    font-size: var(--eds-font-size-md);
    transition:
      border-color var(--eds-duration-fast) var(--eds-easing-standard),
      box-shadow var(--eds-duration-fast) var(--eds-easing-standard);
  }

  .control:hover:not(:disabled):not([aria-disabled='true']) {
    border-color: var(--eds-color-ink-400);
  }

  .control:focus,
  .control:focus-visible,
  .control:focus-within {
    outline: none;
    border-color: var(--eds-color-primary);
    box-shadow: var(--eds-shadow-focus);
  }

  .control:disabled,
  .control[aria-disabled='true'] {
    opacity: 0.55;
    cursor: not-allowed;
    background: var(--eds-color-ink-50);
  }

  .control[data-invalid='true'] {
    border-color: var(--eds-color-danger-600);
  }

  .control.sm {
    min-height: 2rem;
    font-size: var(--eds-font-size-sm);
  }

  .control.lg {
    min-height: 3rem;
    font-size: var(--eds-font-size-lg);
  }
`;