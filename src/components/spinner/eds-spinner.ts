import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { hostBase } from '../../foundations/shared.js';

export type EdsSpinnerSize = 'sm' | 'md' | 'lg';

/**
 * Loading indicator with optional visible or screen-reader-only label.
 *
 * @element eds-spinner
 * @example
 * ```html
 * <eds-spinner size="md" label="Loading"></eds-spinner>
 * ```
 */
@customElement('eds-spinner')
export class EdsSpinner extends LitElement {
  static override styles = [
    hostBase,
    css`
      :host {
        vertical-align: middle;
      }

      .spinner {
        display: inline-flex;
        align-items: center;
        gap: var(--eds-space-2);
      }

      .ring {
        display: block;
        border-style: solid;
        border-color: var(--eds-color-primary);
        border-right-color: transparent;
        border-radius: var(--eds-radius-full);
        animation: spin var(--eds-duration-slow) linear infinite;
      }

      .sm .ring {
        width: 1rem;
        height: 1rem;
        border-width: 2px;
      }

      .md .ring {
        width: 1.5rem;
        height: 1.5rem;
        border-width: 2px;
      }

      .lg .ring {
        width: 2rem;
        height: 2rem;
        border-width: 3px;
      }

      .label {
        font-size: var(--eds-font-size-sm);
        color: var(--eds-color-text-muted);
      }

      .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
      }

      @keyframes spin {
        to {
          transform: rotate(360deg);
        }
      }
    `,
  ];

  @property({ reflect: true })
  size: EdsSpinnerSize = 'md';

  @property()
  label = 'Loading';

  @property({ type: Boolean, attribute: 'show-label', reflect: true })
  showLabel = false;

  override render() {
    const labelClass = this.showLabel ? 'label' : 'sr-only';

    return html`
      <div
        class=${classMap({ spinner: true, [this.size]: true })}
        role="status"
        aria-live="polite"
        aria-busy="true"
      >
        <span class="ring" aria-hidden="true"></span>
        ${this.label ? html`<span class=${labelClass}>${this.label}</span>` : nothing}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'eds-spinner': EdsSpinner;
  }
}
