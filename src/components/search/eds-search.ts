import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { focusRing, hostBase, fieldStyles } from '../../foundations/shared.js';
import '../icon/eds-icon.js';

export type EdsSearchSize = 'sm' | 'md' | 'lg';

/**
 * Search field with leading icon and optional clear action.
 *
 * @fires eds-input - Fired on each keystroke with the current value
 * @fires eds-change - Fired when the value is committed (blur or Enter)
 * @fires eds-clear - Fired when the clear button is activated
 *
 * @element eds-search
 */
@customElement('eds-search')
export class EdsSearch extends LitElement {
  static override styles = [
    hostBase,
    fieldStyles,
    css`
      :host {
        display: block;
        width: 100%;
      }

      .wrapper {
        display: flex;
        align-items: center;
        gap: var(--eds-space-2);
        width: 100%;
      }

      .icon {
        display: inline-flex;
        flex-shrink: 0;
        color: var(--eds-color-text-muted);
        line-height: 0;
      }

      input.control {
        width: 100%;
        border: 0;
        background: transparent;
        padding: 0;
        min-height: unset;
        color: inherit;
        font: inherit;
      }

      input.control:focus,
      input.control:focus-visible {
        box-shadow: none;
        border-color: transparent;
        outline: none;
      }

      .clear {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        margin: 0;
        padding: var(--eds-space-1);
        border: none;
        border-radius: var(--eds-radius-sm);
        background: transparent;
        color: var(--eds-color-text-muted);
        cursor: pointer;
        line-height: 0;
        transition:
          color var(--eds-duration-fast) var(--eds-easing-standard),
          background-color var(--eds-duration-fast) var(--eds-easing-standard);
      }

      .clear:hover:not(:disabled) {
        color: var(--eds-color-text);
        background: var(--eds-color-ink-100);
      }

      .clear:disabled {
        opacity: 0.55;
        cursor: not-allowed;
      }

      ${focusRing}
    `,
  ];

  @property()
  value = '';

  @property()
  placeholder = 'Search…';

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ reflect: true })
  size: EdsSearchSize = 'md';

  @property({ type: Boolean, reflect: true })
  clearable = true;

  private inputId = `eds-search-${Math.random().toString(36).slice(2, 9)}`;

  private emit(name: 'eds-input' | 'eds-change' | 'eds-clear', originalEvent?: Event) {
    this.dispatchEvent(
      new CustomEvent(name, {
        detail: { value: this.value, originalEvent },
        bubbles: true,
        composed: true,
      }),
    );
  }

  private handleInput(event: InputEvent) {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this.emit('eds-input', event);
  }

  private handleChange(event: Event) {
    this.emit('eds-change', event);
  }

  private handleClear(event: Event) {
    event.preventDefault();
    if (this.disabled) return;
    this.value = '';
    this.emit('eds-clear', event);
    this.emit('eds-input', event);
    this.emit('eds-change', event);
    const input = this.shadowRoot?.querySelector('input');
    input?.focus();
  }

  private iconSize(): 'sm' | 'md' {
    return this.size === 'sm' ? 'sm' : 'md';
  }

  override render() {
    const controlClasses = {
      control: true,
      wrapper: true,
      [this.size]: true,
    };
    const showClear = this.clearable && this.value.length > 0;

    return html`
      <div class="field">
        <div class=${classMap(controlClasses)}>
          <span class="icon" aria-hidden="true">
            <eds-icon name="search" size=${this.iconSize()}></eds-icon>
          </span>
          <input
            class="control"
            id=${this.inputId}
            type="search"
            .value=${this.value}
            placeholder=${this.placeholder}
            ?disabled=${this.disabled}
            @input=${this.handleInput}
            @change=${this.handleChange}
          />
          ${showClear
            ? html`
                <button
                  type="button"
                  class="clear"
                  aria-label="Clear search"
                  ?disabled=${this.disabled}
                  @click=${this.handleClear}
                >
                  <eds-icon name="x" size=${this.iconSize()}></eds-icon>
                </button>
              `
            : nothing}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'eds-search': EdsSearch;
  }
}
