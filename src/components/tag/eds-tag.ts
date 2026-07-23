import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { focusRing, hostBase } from '../../foundations/shared.js';
import type { EdsIconName } from '../../icons/paths.js';
import '../icon/eds-icon.js';

export type EdsTagVariant = 'neutral' | 'brand' | 'success' | 'warning' | 'danger' | 'info';

/**
 * Inline tag for filters, selections, and removable labels.
 *
 * @slot - Tag content when `label` is not set
 * @fires eds-dismiss - Fired when the dismiss button is clicked
 *
 * @element eds-tag
 */
@customElement('eds-tag')
export class EdsTag extends LitElement {
  static override styles = [
    hostBase,
    css`
      :host {
        display: inline-flex;
        vertical-align: middle;
      }

      .tag {
        display: inline-flex;
        align-items: center;
        gap: var(--eds-space-1);
        padding: 0.25rem 0.5rem;
        border: 1px solid transparent;
        border-radius: var(--eds-radius-sm);
        font-size: var(--eds-font-size-sm);
        font-weight: var(--eds-font-weight-semibold);
        line-height: 1;
        white-space: nowrap;
        user-select: none;
      }

      .icon-leading {
        display: inline-flex;
        line-height: 0;
        flex-shrink: 0;
      }

      .label {
        display: inline-flex;
        align-items: center;
      }

      .dismiss {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 1.25rem;
        height: 1.25rem;
        margin: 0 -0.125rem 0 0;
        padding: 0;
        border: none;
        border-radius: var(--eds-radius-sm);
        background: transparent;
        color: inherit;
        cursor: pointer;
        opacity: 0.75;
        line-height: 0;
        transition: opacity var(--eds-duration-fast) var(--eds-easing-standard);
      }

      .dismiss:hover {
        opacity: 1;
      }

      ${focusRing}

      .neutral {
        background: var(--eds-color-ink-100);
        color: var(--eds-color-ink-700);
        border-color: var(--eds-color-ink-200);
      }

      .brand {
        background: var(--eds-color-brand-100);
        color: var(--eds-color-brand-800);
        border-color: rgb(15 110 106 / 0.15);
      }

      .success {
        background: var(--eds-color-success-100);
        color: var(--eds-color-success-600);
        border-color: rgb(31 122 77 / 0.15);
      }

      .warning {
        background: var(--eds-color-warning-100);
        color: var(--eds-color-warning-600);
        border-color: rgb(154 103 0 / 0.15);
      }

      .danger {
        background: var(--eds-color-danger-100);
        color: var(--eds-color-danger-600);
        border-color: rgb(180 35 24 / 0.15);
      }

      .info {
        background: var(--eds-color-info-100);
        color: var(--eds-color-info-600);
        border-color: rgb(23 92 211 / 0.15);
      }
    `,
  ];

  @property()
  label = '';

  @property({ reflect: true })
  variant: EdsTagVariant = 'neutral';

  @property({ type: Boolean, reflect: true })
  dismissible = false;

  /** Optional leading icon. Empty string hides the icon. */
  @property()
  icon: EdsIconName | '' = '';

  private handleDismiss(event: Event) {
    event.stopPropagation();
    this.dispatchEvent(
      new CustomEvent('eds-dismiss', {
        bubbles: true,
        composed: true,
      }),
    );
  }

  override render() {
    const classes = {
      tag: true,
      [this.variant]: true,
    };

    return html`
      <span class=${classMap(classes)}>
        ${this.icon
          ? html`<span class="icon-leading"><eds-icon name=${this.icon} size="sm"></eds-icon></span>`
          : nothing}
        <span class="label">${this.label ? this.label : html`<slot></slot>`}</span>
        ${this.dismissible
          ? html`
              <button
                class="dismiss"
                type="button"
                aria-label="Remove tag"
                @click=${this.handleDismiss}
              >
                <eds-icon name="x" size="sm"></eds-icon>
              </button>
            `
          : nothing}
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'eds-tag': EdsTag;
  }
}
