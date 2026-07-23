import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { focusRing, hostBase } from '../../foundations/shared.js';
import type { EdsIconName } from '../../icons/paths.js';
import '../icon/eds-icon.js';

export type EdsSegmentedControlOption = {
  label: string;
  value: string;
  icon?: string;
  disabled?: boolean;
};

export type EdsSegmentedControlSize = 'sm' | 'md';

/**
 * iOS-style segmented control / toggle button group.
 *
 * @fires eds-change - Fired when the selected value changes
 *
 * @element eds-segmented-control
 */
@customElement('eds-segmented-control')
export class EdsSegmentedControl extends LitElement {
  static override styles = [
    hostBase,
    css`
      :host {
        display: inline-block;
      }

      :host([full-width]) {
        display: block;
        width: 100%;
      }

      .group {
        display: inline-flex;
        align-items: stretch;
        padding: var(--eds-space-1);
        border: 1px solid var(--eds-color-border);
        border-radius: var(--eds-radius-md);
        background: var(--eds-color-ink-50);
        gap: var(--eds-space-1);
      }

      :host([full-width]) .group {
        display: flex;
        width: 100%;
      }

      .segment {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: var(--eds-space-2);
        margin: 0;
        padding: 0 var(--eds-space-4);
        border: none;
        border-radius: calc(var(--eds-radius-md) - 2px);
        background: transparent;
        color: var(--eds-color-text-muted);
        font: inherit;
        font-weight: var(--eds-font-weight-semibold);
        line-height: 1;
        white-space: nowrap;
        cursor: pointer;
        transition:
          background-color var(--eds-duration-fast) var(--eds-easing-standard),
          color var(--eds-duration-fast) var(--eds-easing-standard),
          box-shadow var(--eds-duration-fast) var(--eds-easing-standard);
      }

      :host([full-width]) .segment {
        flex: 1;
      }

      .segment[data-selected='true'] {
        background: var(--eds-color-surface);
        color: var(--eds-color-text);
        box-shadow: var(--eds-shadow-sm);
      }

      .segment:hover:not(:disabled):not([data-selected='true']) {
        color: var(--eds-color-text);
      }

      .segment:disabled {
        opacity: 0.45;
        cursor: not-allowed;
      }

      ${focusRing}

      :host([size='sm']) .segment {
        min-height: 1.75rem;
        padding-inline: var(--eds-space-3);
        font-size: var(--eds-font-size-xs);
      }

      :host([size='md']) .segment {
        min-height: 2.25rem;
        font-size: var(--eds-font-size-sm);
      }
    `,
  ];

  @property({ type: Array })
  options: EdsSegmentedControlOption[] = [];

  @property({ reflect: true })
  value = '';

  @property({ reflect: true })
  size: EdsSegmentedControlSize = 'md';

  @property({ type: Boolean, attribute: 'full-width', reflect: true })
  fullWidth = false;

  private handleSelect(option: EdsSegmentedControlOption, event: Event) {
    if (option.disabled || option.value === this.value) return;
    this.value = option.value;
    this.dispatchEvent(
      new CustomEvent('eds-change', {
        detail: { value: this.value, originalEvent: event },
        bubbles: true,
        composed: true,
      }),
    );
  }

  override render() {
    return html`
      <div class="group" role="group" aria-label="Segmented control">
        ${this.options.map(
          (option) => html`
            <button
              type="button"
              class="segment"
              data-selected=${option.value === this.value ? 'true' : 'false'}
              ?disabled=${option.disabled}
              aria-pressed=${option.value === this.value ? 'true' : 'false'}
              @click=${(event: Event) => this.handleSelect(option, event)}
            >
              ${option.icon
                ? html`<eds-icon name=${option.icon as EdsIconName} size="sm"></eds-icon>`
                : nothing}
              ${option.label}
            </button>
          `,
        )}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'eds-segmented-control': EdsSegmentedControl;
  }
}
