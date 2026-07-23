import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, queryAll } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { hostBase, fieldStyles } from '../../foundations/shared.js';

export type EdsPinInputType = 'text' | 'number' | 'password';

/**
 * OTP-style segmented input for verification codes.
 *
 * @fires eds-change - Fired when the value changes
 * @fires eds-complete - Fired when all digits are filled
 *
 * @element eds-pin-input
 */
@customElement('eds-pin-input')
export class EdsPinInput extends LitElement {
  static override styles = [
    hostBase,
    fieldStyles,
    css`
      :host {
        display: block;
        width: 100%;
      }

      .inputs {
        display: flex;
        align-items: center;
        gap: var(--eds-space-2);
      }

      .cell {
        width: 2.75rem;
        height: 2.75rem;
        padding: 0;
        border: 1px solid var(--eds-color-border-strong);
        border-radius: var(--eds-radius-md);
        background: var(--eds-color-surface);
        color: var(--eds-color-text);
        font: inherit;
        font-size: var(--eds-font-size-lg);
        font-weight: var(--eds-font-weight-semibold);
        text-align: center;
        transition:
          border-color var(--eds-duration-fast) var(--eds-easing-standard),
          box-shadow var(--eds-duration-fast) var(--eds-easing-standard);
      }

      .cell:hover:not(:disabled) {
        border-color: var(--eds-color-ink-400);
      }

      .cell:focus {
        outline: none;
        border-color: var(--eds-color-primary);
        box-shadow: var(--eds-shadow-focus);
      }

      .cell:disabled {
        opacity: 0.55;
        cursor: not-allowed;
        background: var(--eds-color-ink-50);
      }

      .cell[data-invalid='true'] {
        border-color: var(--eds-color-danger-600);
      }
    `,
  ];

  @property({ type: Number })
  length = 6;

  @property()
  value = '';

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ reflect: true })
  type: EdsPinInputType = 'text';

  @property()
  label = '';

  @property({ type: Boolean, reflect: true })
  invalid = false;

  @property({ attribute: 'error-message' })
  errorMessage = '';

  @queryAll('.cell')
  private cells!: NodeListOf<HTMLInputElement>;

  private groupId = `eds-pin-input-${Math.random().toString(36).slice(2, 9)}`;

  private emit(name: 'eds-change' | 'eds-complete') {
    this.dispatchEvent(
      new CustomEvent(name, {
        detail: { value: this.value },
        bubbles: true,
        composed: true,
      }),
    );
  }

  private syncValueFromCells() {
    this.value = Array.from(this.cells)
      .map((cell) => cell.value)
      .join('');
    this.emit('eds-change');
    if (this.value.length === this.length) {
      this.emit('eds-complete');
    }
  }

  private focusCell(index: number) {
    const cell = this.cells[index];
    cell?.focus();
    cell?.select();
  }

  private handleInput(index: number, event: InputEvent) {
    const target = event.target as HTMLInputElement;
    const char = target.value.slice(-1);

    if (this.type === 'number' && char && !/^\d$/.test(char)) {
      target.value = '';
      return;
    }

    target.value = char;
    this.syncValueFromCells();

    if (char && index < this.length - 1) {
      this.focusCell(index + 1);
    }
  }

  private handleKeyDown(index: number, event: KeyboardEvent) {
    const target = event.target as HTMLInputElement;

    if (event.key === 'Backspace' && !target.value && index > 0) {
      event.preventDefault();
      this.focusCell(index - 1);
      return;
    }

    if (event.key === 'ArrowLeft' && index > 0) {
      event.preventDefault();
      this.focusCell(index - 1);
      return;
    }

    if (event.key === 'ArrowRight' && index < this.length - 1) {
      event.preventDefault();
      this.focusCell(index + 1);
    }
  }

  private handlePaste(event: ClipboardEvent) {
    event.preventDefault();
    const pasted = event.clipboardData?.getData('text') ?? '';
    const chars = pasted.slice(0, this.length).split('');
    if (this.type === 'number' && chars.some((char) => !/^\d$/.test(char))) {
      return;
    }

    chars.forEach((char, index) => {
      const cell = this.cells[index];
      if (cell) cell.value = char;
    });

    this.syncValueFromCells();
    this.focusCell(Math.min(chars.length, this.length - 1));
  }

  private cellValue(index: number): string {
    return this.value[index] ?? '';
  }

  override render() {
    const inputType = this.type === 'number' ? 'text' : this.type;
    const inputMode = this.type === 'number' ? 'numeric' : undefined;

    return html`
      <div class="field">
        ${this.label
          ? html`<label class="label" id=${`${this.groupId}-label`}>${this.label}</label>`
          : nothing}
        <div
          class="inputs"
          role="group"
          aria-labelledby=${ifDefined(this.label ? `${this.groupId}-label` : undefined)}
          aria-invalid=${this.invalid ? 'true' : 'false'}
          aria-describedby=${ifDefined(
            this.invalid && this.errorMessage ? `${this.groupId}-error` : undefined,
          )}
          @paste=${this.handlePaste}
        >
          ${Array.from({ length: this.length }, (_, index) =>
            html`
              <input
                class=${classMap({ cell: true })}
                type=${inputType}
                inputmode=${ifDefined(inputMode)}
                maxlength="1"
                autocomplete=${index === 0 ? 'one-time-code' : 'off'}
                .value=${this.cellValue(index)}
                ?disabled=${this.disabled}
                data-invalid=${this.invalid ? 'true' : 'false'}
                aria-label=${`Digit ${index + 1} of ${this.length}`}
                @input=${(event: InputEvent) => this.handleInput(index, event)}
                @keydown=${(event: KeyboardEvent) => this.handleKeyDown(index, event)}
              />
            `,
          )}
        </div>
        ${this.invalid && this.errorMessage
          ? html`<span class="error" id=${`${this.groupId}-error`}>${this.errorMessage}</span>`
          : nothing}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'eds-pin-input': EdsPinInput;
  }
}
