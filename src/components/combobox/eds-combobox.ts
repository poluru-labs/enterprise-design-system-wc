import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { hostBase, fieldStyles } from '../../foundations/shared.js';

export type EdsComboboxOption = { label: string; value: string; disabled?: boolean };

/**
 * Filterable select combining text input with a dropdown list.
 *
 * @fires eds-input - Fired when the filter text changes
 * @fires eds-change - Fired when a list option is selected
 *
 * @element eds-combobox
 */
@customElement('eds-combobox')
export class EdsCombobox extends LitElement {
  static override styles = [
    hostBase,
    fieldStyles,
    css`
      :host {
        display: block;
        width: 100%;
      }

      .combobox {
        position: relative;
      }

      input.control {
        width: 100%;
        border: 0;
        background: transparent;
        padding: 0;
        min-height: unset;
      }

      input.control:focus,
      input.control:focus-visible {
        box-shadow: none;
      }

      .listbox {
        position: absolute;
        z-index: 10;
        top: calc(100% + var(--eds-space-1));
        left: 0;
        right: 0;
        margin: 0;
        padding: var(--eds-space-1);
        list-style: none;
        border: 1px solid var(--eds-color-border-strong);
        border-radius: var(--eds-radius-md);
        background: var(--eds-color-surface);
        box-shadow: var(--eds-shadow-md);
        max-height: 12rem;
        overflow-y: auto;
      }

      .option {
        padding: var(--eds-space-2) var(--eds-space-3);
        border-radius: var(--eds-radius-sm);
        cursor: pointer;
        font-size: var(--eds-font-size-md);
      }

      .option[data-active='true'],
      .option:hover:not([data-disabled='true']) {
        background: var(--eds-color-brand-50);
        color: var(--eds-color-primary);
      }

      .option[data-disabled='true'] {
        opacity: 0.45;
        cursor: not-allowed;
      }

      .empty {
        padding: var(--eds-space-3);
        color: var(--eds-color-text-subtle);
        font-size: var(--eds-font-size-sm);
      }
    `,
  ];

  @property()
  label = '';

  @property()
  value = '';

  @property({ type: Array })
  options: EdsComboboxOption[] = [];

  @property()
  placeholder = '';

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: Boolean, reflect: true })
  invalid = false;

  @property({ attribute: 'error-message' })
  errorMessage = '';

  @state()
  private filter = '';

  @state()
  private open = false;

  @state()
  private activeIndex = -1;

  private comboboxId = `eds-combobox-${Math.random().toString(36).slice(2, 9)}`;

  override updated(changed: Map<string, unknown>) {
    if (changed.has('value') && !this.open) {
      const match = this.options.find((o) => o.value === this.value);
      this.filter = match?.label ?? this.value;
    }
  }

  private get filteredOptions(): EdsComboboxOption[] {
    const query = this.filter.trim().toLowerCase();
    if (!query) return this.options;
    return this.options.filter((o) => o.label.toLowerCase().includes(query));
  }

  private emit(name: 'eds-input' | 'eds-change', detail: Record<string, unknown>) {
    this.dispatchEvent(
      new CustomEvent(name, {
        detail,
        bubbles: true,
        composed: true,
      }),
    );
  }

  private openList() {
    if (this.disabled) return;
    this.open = true;
    this.activeIndex = Math.max(
      0,
      this.filteredOptions.findIndex((o) => o.value === this.value),
    );
  }

  private closeList() {
    this.open = false;
    this.activeIndex = -1;
  }

  private selectOption(option: EdsComboboxOption, originalEvent?: Event) {
    if (option.disabled) return;
    this.value = option.value;
    this.filter = option.label;
    this.closeList();
    this.emit('eds-change', { value: this.value, originalEvent });
  }

  private handleInput(event: InputEvent) {
    const target = event.target as HTMLInputElement;
    this.filter = target.value;
    this.open = true;
    this.activeIndex = 0;
    this.emit('eds-input', { value: this.filter, originalEvent: event });
  }

  private handleKeydown(event: KeyboardEvent) {
    const items = this.filteredOptions.filter((o) => !o.disabled);
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.openList();
      this.activeIndex = Math.min(this.activeIndex + 1, items.length - 1);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.openList();
      this.activeIndex = Math.max(this.activeIndex - 1, 0);
    } else if (event.key === 'Enter') {
      event.preventDefault();
      const option = items[this.activeIndex];
      if (option) this.selectOption(option, event);
    } else if (event.key === 'Escape') {
      event.preventDefault();
      this.closeList();
      const match = this.options.find((o) => o.value === this.value);
      this.filter = match?.label ?? '';
    }
  }

  private handleBlur(event: FocusEvent) {
    const related = event.relatedTarget as Node | null;
    if (related && this.renderRoot.contains(related)) return;
    this.closeList();
    const match = this.options.find((o) => o.value === this.value);
    this.filter = match?.label ?? this.filter;
  }

  override render() {
    const items = this.filteredOptions;
    const activeOption = items[this.activeIndex];

    return html`
      <div class="field">
        ${this.label
          ? html`<label class="label" for=${this.comboboxId}>${this.label}</label>`
          : nothing}
        <div class="combobox">
          <div
            class=${classMap({ control: true, md: true })}
            data-invalid=${this.invalid ? 'true' : 'false'}
          >
            <input
              class="control"
              id=${this.comboboxId}
              role="combobox"
              type="text"
              .value=${this.filter}
              placeholder=${this.placeholder}
              ?disabled=${this.disabled}
              aria-invalid=${this.invalid ? 'true' : 'false'}
              aria-expanded=${this.open ? 'true' : 'false'}
              aria-controls=${`${this.comboboxId}-listbox`}
              aria-activedescendant=${ifDefined(
                activeOption ? `${this.comboboxId}-opt-${activeOption.value}` : undefined,
              )}
              aria-describedby=${ifDefined(this.errorMessage ? `${this.comboboxId}-error` : undefined)}
              autocomplete="off"
              @input=${this.handleInput}
              @focus=${this.openList}
              @keydown=${this.handleKeydown}
              @blur=${this.handleBlur}
            />
          </div>
          ${this.open
            ? html`
                <ul
                  id=${`${this.comboboxId}-listbox`}
                  class="listbox"
                  role="listbox"
                  @mousedown=${(e: Event) => e.preventDefault()}
                >
                  ${items.length === 0
                    ? html`<li class="empty">No matches found</li>`
                    : items.map((option, index) => html`
                        <li
                          id=${`${this.comboboxId}-opt-${option.value}`}
                          class="option"
                          role="option"
                          aria-selected=${option.value === this.value ? 'true' : 'false'}
                          data-active=${index === this.activeIndex ? 'true' : 'false'}
                          data-disabled=${option.disabled ? 'true' : 'false'}
                          @click=${() => this.selectOption(option)}
                        >
                          ${option.label}
                        </li>
                      `)}
                </ul>
              `
            : nothing}
        </div>
        ${this.invalid && this.errorMessage
          ? html`<span class="error" id=${`${this.comboboxId}-error`}>${this.errorMessage}</span>`
          : nothing}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'eds-combobox': EdsCombobox;
  }
}
