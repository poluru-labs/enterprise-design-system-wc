import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { hostBase } from '../../foundations/shared.js';

/**
 * Radio option. Place inside `eds-radio-group`.
 *
 * @slot - Optional label content when `label` is not set
 *
 * @element eds-radio
 */
@customElement('eds-radio')
export class EdsRadio extends LitElement {
  static override styles = [
    hostBase,
    css`
      :host {
        display: inline-flex;
      }

      .radio {
        display: inline-flex;
        align-items: flex-start;
        gap: var(--eds-space-2);
        cursor: pointer;
        user-select: none;
      }

      .radio[data-disabled='true'] {
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

      .dot-wrap {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        width: 1.125rem;
        height: 1.125rem;
        margin-top: 0.125rem;
        border: 1px solid var(--eds-color-border-strong);
        border-radius: 50%;
        background: var(--eds-color-surface);
        transition:
          border-color var(--eds-duration-fast) var(--eds-easing-standard),
          box-shadow var(--eds-duration-fast) var(--eds-easing-standard);
      }

      input:focus-visible + .dot-wrap {
        box-shadow: var(--eds-shadow-focus);
      }

      input:checked + .dot-wrap {
        border-color: var(--eds-color-primary);
      }

      .dot {
        width: 0.5rem;
        height: 0.5rem;
        border-radius: 50%;
        background: var(--eds-color-primary);
        opacity: 0;
        transform: scale(0.5);
        transition:
          opacity var(--eds-duration-fast) var(--eds-easing-standard),
          transform var(--eds-duration-fast) var(--eds-easing-standard);
      }

      input:checked + .dot-wrap .dot {
        opacity: 1;
        transform: scale(1);
      }

      .label-text {
        font-size: var(--eds-font-size-md);
        line-height: var(--eds-line-height-normal);
      }
    `,
  ];

  @property()
  label = '';

  @property()
  value = '';

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: Boolean, reflect: true })
  checked = false;

  @property()
  name = '';

  private inputId = `eds-radio-${Math.random().toString(36).slice(2, 9)}`;

  private handleChange(event: Event) {
    this.dispatchEvent(
      new CustomEvent('eds-radio-select', {
        detail: { value: this.value, originalEvent: event },
        bubbles: true,
        composed: true,
      }),
    );
  }

  override render() {
    return html`
      <label class="radio" data-disabled=${this.disabled ? 'true' : 'false'}>
        <input
          id=${this.inputId}
          type="radio"
          name=${ifDefined(this.name || undefined)}
          .value=${this.value}
          .checked=${this.checked}
          ?disabled=${this.disabled}
          @change=${this.handleChange}
        />
        <span class="dot-wrap" aria-hidden="true"><span class="dot"></span></span>
        ${this.label ? html`<span class="label-text">${this.label}</span>` : html`<slot></slot>`}
      </label>
    `;
  }
}

export type EdsRadioGroupOrientation = 'horizontal' | 'vertical';

/**
 * Radio group coordinating `eds-radio` children.
 *
 * @slot - `eds-radio` elements
 * @fires eds-change - Fired when the selected value changes
 *
 * @element eds-radio-group
 */
@customElement('eds-radio-group')
export class EdsRadioGroup extends LitElement {
  static override styles = [
    hostBase,
    css`
      :host {
        display: block;
      }

      .group {
        display: flex;
        flex-direction: column;
        gap: var(--eds-space-3);
      }

      .group[data-orientation='horizontal'] {
        flex-direction: row;
        flex-wrap: wrap;
        align-items: center;
        gap: var(--eds-space-4);
      }

      .label {
        font-size: var(--eds-font-size-sm);
        font-weight: var(--eds-font-weight-semibold);
        color: var(--eds-color-text);
        margin-bottom: var(--eds-space-1);
      }

      .options {
        display: flex;
        flex-direction: inherit;
        gap: inherit;
      }
    `,
  ];

  @property()
  label = '';

  @property()
  name = '';

  @property()
  value = '';

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ reflect: true })
  orientation: EdsRadioGroupOrientation = 'vertical';

  override connectedCallback() {
    super.connectedCallback();
    this.addEventListener('eds-radio-select', this.handleRadioSelect);
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('eds-radio-select', this.handleRadioSelect);
  }

  override firstUpdated() {
    this.syncRadios();
  }

  override updated(changed: Map<string, unknown>) {
    if (changed.has('value') || changed.has('name') || changed.has('disabled')) {
      this.syncRadios();
    }
  }

  private syncRadios() {
    const radios = this.querySelectorAll<EdsRadio>('eds-radio');
    radios.forEach((radio) => {
      radio.name = this.name;
      radio.checked = radio.value === this.value;
      if (this.disabled) radio.disabled = true;
    });
  }

  private handleRadioSelect = (event: Event) => {
    const detail = (event as CustomEvent<{ value: string; originalEvent: Event }>).detail;
    this.value = detail.value;
    this.syncRadios();
    this.dispatchEvent(
      new CustomEvent('eds-change', {
        detail: { value: this.value, originalEvent: detail.originalEvent },
        bubbles: true,
        composed: true,
      }),
    );
  };

  override render() {
    return html`
      <fieldset class="group" data-orientation=${this.orientation}>
        ${this.label ? html`<legend class="label">${this.label}</legend>` : nothing}
        <div class="options">
          <slot @slotchange=${this.syncRadios}></slot>
        </div>
      </fieldset>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'eds-radio': EdsRadio;
    'eds-radio-group': EdsRadioGroup;
  }
}
