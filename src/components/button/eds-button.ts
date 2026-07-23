import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { hostBase } from '../../foundations/shared.js';
import type { EdsIconName } from '../../icons/paths.js';
import '../icon/eds-icon.js';

export type EdsButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'danger';
export type EdsButtonSize = 'sm' | 'md' | 'lg';

/**
 * Enterprise button for primary actions and secondary flows.
 *
 * @slot - Button label content
 * @slot icon - Custom leading icon (overrides `icon` prop)
 * @slot icon-trailing - Custom trailing icon (overrides `icon-trailing` prop)
 * @fires eds-click - Fired when the button is activated
 *
 * @element eds-button
 */
@customElement('eds-button')
export class EdsButton extends LitElement {
  static override styles = [
    hostBase,
    css`
      :host {
        vertical-align: middle;
      }

      .button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: var(--eds-space-2);
        margin: 0;
        border: 1px solid transparent;
        border-radius: var(--eds-button-radius, var(--eds-radius-md));
        font-family: inherit;
        font-weight: var(--eds-font-weight-semibold);
        line-height: 1;
        letter-spacing: 0.01em;
        cursor: pointer;
        user-select: none;
        text-decoration: none;
        white-space: nowrap;
        transition:
          background-color var(--eds-duration-fast) var(--eds-easing-standard),
          border-color var(--eds-duration-fast) var(--eds-easing-standard),
          color var(--eds-duration-fast) var(--eds-easing-standard),
          box-shadow var(--eds-duration-fast) var(--eds-easing-standard),
          transform var(--eds-duration-fast) var(--eds-easing-standard);
      }

      .button:focus-visible {
        outline: none;
        box-shadow: var(--eds-shadow-focus);
      }

      .button:active:not(:disabled) {
        transform: translateY(1px);
      }

      .button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }

      .sm {
        min-height: 2rem;
        padding: 0 var(--eds-space-3);
        font-size: var(--eds-font-size-sm);
      }

      .md {
        min-height: 2.5rem;
        padding: 0 var(--eds-space-4);
        font-size: var(--eds-font-size-md);
      }

      .lg {
        min-height: 3rem;
        padding: 0 var(--eds-space-5);
        font-size: var(--eds-font-size-lg);
      }

      .icon-only.sm {
        width: 2rem;
        padding: 0;
      }

      .icon-only.md {
        width: 2.5rem;
        padding: 0;
      }

      .icon-only.lg {
        width: 3rem;
        padding: 0;
      }

      .primary {
        background: var(--eds-color-primary);
        color: var(--eds-color-text-inverse);
      }

      .primary:hover:not(:disabled) {
        background: var(--eds-color-primary-hover);
      }

      .primary:active:not(:disabled) {
        background: var(--eds-color-primary-active);
      }

      .secondary {
        background: var(--eds-color-surface);
        color: var(--eds-color-text);
        border-color: var(--eds-color-border-strong);
        box-shadow: var(--eds-shadow-xs);
      }

      .secondary:hover:not(:disabled) {
        background: var(--eds-color-ink-50);
        border-color: var(--eds-color-ink-400);
      }

      .tertiary {
        background: transparent;
        color: var(--eds-color-primary);
      }

      .tertiary:hover:not(:disabled) {
        background: var(--eds-color-brand-50);
      }

      .danger {
        background: var(--eds-color-danger-600);
        color: var(--eds-color-text-inverse);
      }

      .danger:hover:not(:disabled) {
        background: #912018;
      }

      .full-width {
        width: 100%;
      }

      .leading,
      .trailing {
        display: inline-flex;
        align-items: center;
        line-height: 0;
      }

      .label:empty {
        display: none;
      }

      .spinner {
        width: 1em;
        height: 1em;
        border: 2px solid currentColor;
        border-right-color: transparent;
        border-radius: 50%;
        animation: spin var(--eds-duration-slow) linear infinite;
      }

      @keyframes spin {
        to {
          transform: rotate(360deg);
        }
      }
    `,
  ];

  @property({ reflect: true })
  variant: EdsButtonVariant = 'primary';

  @property({ reflect: true })
  size: EdsButtonSize = 'md';

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: Boolean, reflect: true })
  loading = false;

  @property({ type: Boolean, attribute: 'full-width', reflect: true })
  fullWidth = false;

  /** Leading icon name from the design system set. */
  @property()
  icon: EdsIconName | '' = '';

  /** Trailing icon name from the design system set. */
  @property({ attribute: 'icon-trailing' })
  iconTrailing: EdsIconName | '' = '';

  /** Hide label and render a square icon button. */
  @property({ type: Boolean, attribute: 'icon-only', reflect: true })
  iconOnly = false;

  @property()
  type: 'button' | 'submit' | 'reset' = 'button';

  @property()
  href?: string;

  @property()
  target?: string;

  @property()
  rel?: string;

  /** Accessible name when `icon-only` is set. */
  @property({ attribute: 'accessible-label' })
  accessibleLabel = '';

  private handleClick(event: MouseEvent) {
    if (this.disabled || this.loading) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    this.dispatchEvent(
      new CustomEvent('eds-click', {
        detail: { originalEvent: event },
        bubbles: true,
        composed: true,
      }),
    );
  }

  private iconSize(): 'sm' | 'md' {
    return this.size === 'sm' ? 'sm' : 'md';
  }

  private renderLeading() {
    return html`
      <span class="leading">
        <slot name="icon">
          ${this.icon
            ? html`<eds-icon name=${this.icon} size=${this.iconSize()}></eds-icon>`
            : nothing}
        </slot>
      </span>
    `;
  }

  private renderTrailing() {
    if (this.iconOnly) return nothing;
    return html`
      <span class="trailing">
        <slot name="icon-trailing">
          ${this.iconTrailing
            ? html`<eds-icon name=${this.iconTrailing} size=${this.iconSize()}></eds-icon>`
            : nothing}
        </slot>
      </span>
    `;
  }

  override render() {
    const classes = {
      button: true,
      [this.variant]: true,
      [this.size]: true,
      'full-width': this.fullWidth,
      'icon-only': this.iconOnly,
    };

    const content = html`
      ${this.loading ? html`<span class="spinner" aria-hidden="true"></span>` : this.renderLeading()}
      ${this.iconOnly ? nothing : html`<span class="label"><slot></slot></span>`}
      ${this.loading ? nothing : this.renderTrailing()}
    `;

    const label = this.iconOnly
      ? this.accessibleLabel || this.getAttribute('aria-label') || this.icon || 'Button'
      : this.accessibleLabel || this.getAttribute('aria-label') || undefined;

    if (this.href && !this.disabled) {
      return html`
        <a
          class=${classMap(classes)}
          href=${this.href}
          target=${ifDefined(this.target)}
          rel=${ifDefined(this.rel ?? (this.target === '_blank' ? 'noopener noreferrer' : undefined))}
          aria-label=${ifDefined(label || undefined)}
          aria-busy=${this.loading ? 'true' : 'false'}
          @click=${this.handleClick}
        >
          ${content}
        </a>
      `;
    }

    return html`
      <button
        class=${classMap(classes)}
        type=${this.type}
        ?disabled=${this.disabled || this.loading}
        aria-label=${ifDefined(label || undefined)}
        aria-busy=${this.loading ? 'true' : 'false'}
        @click=${this.handleClick}
      >
        ${content}
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'eds-button': EdsButton;
  }
}
