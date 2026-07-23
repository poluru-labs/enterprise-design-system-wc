import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { hostBase } from '../../foundations/shared.js';
import type { EdsIconName } from '../../icons/paths.js';
import type { EdsButtonSize, EdsButtonVariant } from '../button/eds-button.js';
import '../button/eds-button.js';
import '../dropdown-menu/eds-dropdown-menu.js';

export type EdsSplitButtonVariant = Extract<EdsButtonVariant, 'primary' | 'secondary' | 'danger'>;
export type EdsSplitButtonSize = EdsButtonSize;

/**
 * Split button combining a primary action with a dropdown menu.
 *
 * @slot - `eds-menu-item` children for the dropdown menu
 * @fires eds-click - Fired when the primary action is activated
 * @fires eds-select - Fired when a menu item is selected (`detail.value`, `detail.label`)
 *
 * @element eds-split-button
 */
@customElement('eds-split-button')
export class EdsSplitButton extends LitElement {
  static override styles = [
    hostBase,
    css`
      :host {
        display: inline-flex;
        vertical-align: middle;
      }

      .split {
        display: inline-flex;
        align-items: stretch;
      }

      .primary-action {
        --eds-button-radius: var(--eds-radius-md) 0 0 var(--eds-radius-md);
      }

      .menu {
        margin-inline-start: -1px;
      }

      .menu eds-button {
        --eds-button-radius: 0 var(--eds-radius-md) var(--eds-radius-md) 0;
      }

      .primary-action,
      .menu {
        position: relative;
      }

      .primary-action:hover,
      .primary-action:focus-within,
      .menu:hover,
      .menu:focus-within {
        z-index: 1;
      }

      :host([disabled]) {
        pointer-events: none;
      }
    `,
  ];

  @property()
  label = '';

  @property({ reflect: true })
  variant: EdsSplitButtonVariant = 'primary';

  @property({ reflect: true })
  size: EdsSplitButtonSize = 'md';

  @property({ type: Boolean, reflect: true })
  disabled = false;

  /** Leading icon on the primary action. */
  @property()
  icon: EdsIconName | '' = '';

  private handlePrimaryClick(event: CustomEvent<{ originalEvent: MouseEvent }>) {
    if (this.disabled) return;

    event.stopPropagation();
    this.dispatchEvent(
      new CustomEvent('eds-click', {
        detail: event.detail,
        bubbles: true,
        composed: true,
      }),
    );
  }

  private handleMenuSelect(event: CustomEvent<{ value: string; label: string }>) {
    event.stopPropagation();
    this.dispatchEvent(
      new CustomEvent('eds-select', {
        detail: event.detail,
        bubbles: true,
        composed: true,
      }),
    );
  }

  override render() {
    return html`
      <div class="split" role="group" aria-label=${this.label || 'Split button'}>
        <eds-button
          class="primary-action"
          variant=${this.variant}
          size=${this.size}
          ?disabled=${this.disabled}
          icon=${this.icon}
          @eds-click=${this.handlePrimaryClick}
        >
          ${this.label}
        </eds-button>
        <eds-dropdown-menu class="menu" placement="bottom" @eds-select=${this.handleMenuSelect}>
          <eds-button
            slot="trigger"
            variant=${this.variant}
            size=${this.size}
            ?disabled=${this.disabled}
            icon="chevron-down"
            icon-only
            aria-label="More options"
          ></eds-button>
          <slot></slot>
        </eds-dropdown-menu>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'eds-split-button': EdsSplitButton;
  }
}
