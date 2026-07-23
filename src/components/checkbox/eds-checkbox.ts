import { LitElement, html, css } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { hostBase } from '../../foundations/shared.js';

/**
 * Accessible checkbox with native input semantics.
 *
 * @fires eds-change - Fired when checked state changes
 *
 * @element eds-checkbox
 */
@customElement('eds-checkbox')
export class EdsCheckbox extends LitElement {
  static override styles = [
    hostBase,
    css`
      :host {
        display: inline-flex;
      }

      .checkbox {
        display: inline-flex;
        align-items: flex-start;
        gap: var(--eds-space-2);
        cursor: pointer;
        user-select: none;
      }

      .checkbox[data-disabled='true'] {
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

      .box {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        width: 1.125rem;
        height: 1.125rem;
        margin-top: 0.125rem;
        border: 1px solid var(--eds-color-border-strong);
        border-radius: var(--eds-radius-sm);
        background: var(--eds-color-surface);
        transition:
          background-color var(--eds-duration-fast) var(--eds-easing-standard),
          border-color var(--eds-duration-fast) var(--eds-easing-standard),
          box-shadow var(--eds-duration-fast) var(--eds-easing-standard);
      }

      input:focus-visible + .box {
        box-shadow: var(--eds-shadow-focus);
      }

      input:checked + .box,
      input:indeterminate + .box {
        background: var(--eds-color-primary);
        border-color: var(--eds-color-primary);
        color: var(--eds-color-text-inverse);
      }

      .mark {
        width: 0.75rem;
        height: 0.75rem;
        opacity: 0;
        transform: scale(0.8);
        transition: opacity var(--eds-duration-fast) var(--eds-easing-standard);
      }

      input:checked + .box .mark-check,
      input:indeterminate + .box .mark-indeterminate {
        opacity: 1;
      }

      .label-text {
        font-size: var(--eds-font-size-md);
        line-height: var(--eds-line-height-normal);
        color: var(--eds-color-text);
      }
    `,
  ];

  @property()
  label = '';

  @property({ type: Boolean, reflect: true })
  checked = false;

  @property({ type: Boolean, reflect: true })
  indeterminate = false;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property()
  name = '';

  @property()
  value = 'on';

  private inputId = `eds-checkbox-${Math.random().toString(36).slice(2, 9)}`;

  @query('input')
  private inputEl?: HTMLInputElement;

  override updated() {
    if (this.inputEl) {
      this.inputEl.indeterminate = this.indeterminate;
    }
  }

  private handleChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.checked = target.checked;
    this.indeterminate = false;
    this.dispatchEvent(
      new CustomEvent('eds-change', {
        detail: { checked: this.checked, value: this.value, originalEvent: event },
        bubbles: true,
        composed: true,
      }),
    );
  }

  override render() {
    return html`
      <label class="checkbox" data-disabled=${this.disabled ? 'true' : 'false'}>
        <input
          id=${this.inputId}
          type="checkbox"
          name=${ifDefined(this.name || undefined)}
          .value=${this.value}
          .checked=${this.checked}
          ?disabled=${this.disabled}
          @change=${this.handleChange}
        />
        <span class="box" aria-hidden="true">
          <svg class="mark mark-check" viewBox="0 0 16 16" fill="none">
            <path d="M3.5 8.5L6.5 11.5L12.5 4.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
          </svg>
          <svg class="mark mark-indeterminate" viewBox="0 0 16 16" fill="none">
            <path d="M4 8H12" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
          </svg>
        </span>
        ${this.label ? html`<span class="label-text">${this.label}</span>` : html`<slot></slot>`}
      </label>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'eds-checkbox': EdsCheckbox;
  }
}
