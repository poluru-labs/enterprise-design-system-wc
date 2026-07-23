import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { hostBase, fieldStyles } from '../../foundations/shared.js';

/**
 * Free-text input with filtered suggestion list.
 *
 * @fires eds-input - Fired on each keystroke with the current text
 * @fires eds-change - Fired when the value is committed (blur or Enter)
 * @fires eds-select - Fired when a suggestion is chosen from the list
 *
 * @element eds-autocomplete
 */
@customElement('eds-autocomplete')
export class EdsAutocomplete extends LitElement {
  static override styles = [
    hostBase,
    fieldStyles,
    css`
      :host {
        display: block;
        width: 100%;
      }

      .autocomplete {
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
      .option:hover {
        background: var(--eds-color-brand-50);
        color: var(--eds-color-primary);
      }
    `,
  ];

  @property()
  label = '';

  @property()
  value = '';

  @property({ type: Array })
  suggestions: string[] = [];

  @property()
  placeholder = '';

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: Number, attribute: 'min-chars' })
  minChars = 1;

  @state()
  private open = false;

  @state()
  private activeIndex = -1;

  private inputId = `eds-autocomplete-${Math.random().toString(36).slice(2, 9)}`;

  private get filteredSuggestions(): string[] {
    const query = this.value.trim().toLowerCase();
    if (query.length < this.minChars) return [];
    return this.suggestions.filter((s) => s.toLowerCase().includes(query));
  }

  private emit(name: 'eds-input' | 'eds-change' | 'eds-select', detail: Record<string, unknown>) {
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
    this.open = this.filteredSuggestions.length > 0;
    this.activeIndex = this.open ? 0 : -1;
  }

  private closeList() {
    this.open = false;
    this.activeIndex = -1;
  }

  private selectSuggestion(suggestion: string, originalEvent?: Event) {
    this.value = suggestion;
    this.closeList();
    this.emit('eds-select', { value: this.value, originalEvent });
    this.emit('eds-change', { value: this.value, originalEvent });
  }

  private handleInput(event: InputEvent) {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this.openList();
    this.emit('eds-input', { value: this.value, originalEvent: event });
  }

  private handleChange(event: Event) {
    this.emit('eds-change', { value: this.value, originalEvent: event });
  }

  private handleKeydown(event: KeyboardEvent) {
    const items = this.filteredSuggestions;
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (items.length) {
        this.open = true;
        this.activeIndex = Math.min(this.activeIndex + 1, items.length - 1);
      }
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.activeIndex = Math.max(this.activeIndex - 1, 0);
    } else if (event.key === 'Enter') {
      if (this.open && this.activeIndex >= 0 && items[this.activeIndex]) {
        event.preventDefault();
        this.selectSuggestion(items[this.activeIndex], event);
      }
    } else if (event.key === 'Escape') {
      event.preventDefault();
      this.closeList();
    }
  }

  private handleBlur(event: FocusEvent) {
    const related = event.relatedTarget as Node | null;
    if (related && this.renderRoot.contains(related)) return;
    this.closeList();
  }

  override render() {
    const items = this.filteredSuggestions;
    const activeItem = items[this.activeIndex];

    return html`
      <div class="field">
        ${this.label
          ? html`<label class="label" for=${this.inputId}>${this.label}</label>`
          : nothing}
        <div class="autocomplete">
          <div class="control md">
            <input
              class="control"
              id=${this.inputId}
              role="combobox"
              type="text"
              .value=${this.value}
              placeholder=${this.placeholder}
              ?disabled=${this.disabled}
              aria-expanded=${this.open ? 'true' : 'false'}
              aria-controls=${`${this.inputId}-listbox`}
              aria-activedescendant=${ifDefined(
                activeItem ? `${this.inputId}-opt-${this.activeIndex}` : undefined,
              )}
              autocomplete="off"
              @input=${this.handleInput}
              @change=${this.handleChange}
              @focus=${this.openList}
              @keydown=${this.handleKeydown}
              @blur=${this.handleBlur}
            />
          </div>
          ${this.open
            ? html`
                <ul
                  id=${`${this.inputId}-listbox`}
                  class="listbox"
                  role="listbox"
                  @mousedown=${(e: Event) => e.preventDefault()}
                >
                  ${items.map(
                    (suggestion, index) => html`
                      <li
                        id=${`${this.inputId}-opt-${index}`}
                        class="option"
                        role="option"
                        data-active=${index === this.activeIndex ? 'true' : 'false'}
                        @click=${() => this.selectSuggestion(suggestion)}
                      >
                        ${suggestion}
                      </li>
                    `,
                  )}
                </ul>
              `
            : nothing}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'eds-autocomplete': EdsAutocomplete;
  }
}
