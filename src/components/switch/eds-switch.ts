import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { hostBase } from '../../foundations/shared.js';

/**
 * Toggle switch for boolean settings.
 *
 * @fires eds-change - Fired when the checked state changes
 *
 * @element eds-switch
 */
@customElement('eds-switch')
export class EdsSwitch extends LitElement {
  static override styles = [
    hostBase,
    css`
      :host {
        display: inline-flex;
      }

      .switch {
        display: inline-flex;
        align-items: center;
        gap: var(--eds-space-3);
        cursor: pointer;
        user-select: none;
      }

      .switch[data-disabled='true'] {
        opacity: 0.55;
        cursor: not-allowed;
      }

      input {
        position: absolute;
        opacity: 0;
        width: 0;
        height: 0;
        margin: 0;
      }

      .track {
        position: relative;
        width: 2.75rem;
        height: 1.5rem;
        border-radius: var(--eds-radius-full, 999px);
        background: var(--eds-color-ink-300);
        transition: background-color var(--eds-duration-fast) var(--eds-easing-standard);
      }

      input:focus-visible + .track {
        box-shadow: var(--eds-shadow-focus);
      }

      input:checked + .track {
        background: var(--eds-color-primary);
      }

      .thumb {
        position: absolute;
        top: 0.125rem;
        left: 0.125rem;
        width: 1.25rem;
        height: 1.25rem;
        border-radius: 50%;
        background: var(--eds-color-surface);
        box-shadow: var(--eds-shadow-xs);
        transition: transform var(--eds-duration-fast) var(--eds-easing-standard);
      }

      input:checked + .track .thumb {
        transform: translateX(1.25rem);
      }

      .label-text {
        font-size: var(--eds-font-size-md);
        line-height: var(--eds-line-height-normal);
      }
    `,
  ];

  @property()
  label = '';

  @property({ type: Boolean, reflect: true })
  checked = false;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property()
  name = '';

  private inputId = `eds-switch-${Math.random().toString(36).slice(2, 9)}`;

  private handleChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.checked = target.checked;
    this.dispatchEvent(
      new CustomEvent('eds-change', {
        detail: { checked: this.checked, originalEvent: event },
        bubbles: true,
        composed: true,
      }),
    );
  }

  override render() {
    return html`
      <label class="switch" data-disabled=${this.disabled ? 'true' : 'false'}>
        <input
          id=${this.inputId}
          type="checkbox"
          role="switch"
          name=${ifDefined(this.name || undefined)}
          .checked=${this.checked}
          ?disabled=${this.disabled}
          aria-checked=${this.checked ? 'true' : 'false'}
          @change=${this.handleChange}
        />
        <span class="track" aria-hidden="true"><span class="thumb"></span></span>
        ${this.label ? html`<span class="label-text">${this.label}</span>` : html`<slot></slot>`}
      </label>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'eds-switch': EdsSwitch;
  }
}
