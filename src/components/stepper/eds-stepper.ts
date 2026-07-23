import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { focusRing, hostBase } from '../../foundations/shared.js';

export type EdsStepperStep = {
  label: string;
  description?: string;
};

export type EdsStepperOrientation = 'horizontal' | 'vertical';

/**
 * Visual step indicators with connectors for multi-step flows.
 *
 * @fires eds-step-click - Fired when a completed or current step is clicked
 *
 * @element eds-stepper
 */
@customElement('eds-stepper')
export class EdsStepper extends LitElement {
  static override styles = [
    hostBase,
    css`
      :host {
        display: block;
        width: 100%;
      }

      .stepper {
        display: flex;
        margin: 0;
        padding: 0;
        list-style: none;
      }

      .stepper[data-orientation='horizontal'] {
        flex-direction: row;
        align-items: flex-start;
      }

      .stepper[data-orientation='vertical'] {
        flex-direction: column;
        gap: var(--eds-space-4);
      }

      .step {
        display: flex;
        flex: 1;
        min-width: 0;
      }

      .stepper[data-orientation='vertical'] .step {
        flex: none;
      }

      .step-button {
        display: flex;
        align-items: flex-start;
        gap: var(--eds-space-3);
        width: 100%;
        margin: 0;
        padding: 0;
        border: none;
        background: transparent;
        font: inherit;
        text-align: left;
        color: inherit;
        cursor: default;
      }

      .step-button[data-clickable='true'] {
        cursor: pointer;
      }

      .step-button[data-clickable='true']:hover .indicator {
        border-color: var(--eds-color-primary);
      }

      ${focusRing}

      .indicator-wrap {
        display: flex;
        flex-direction: column;
        align-items: center;
        flex-shrink: 0;
      }

      .stepper[data-orientation='horizontal'] .indicator-wrap {
        flex-direction: row;
        align-items: center;
        flex: 1;
      }

      .indicator {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 1.75rem;
        height: 1.75rem;
        border: 2px solid var(--eds-color-border-strong);
        border-radius: 50%;
        background: var(--eds-color-surface);
        color: var(--eds-color-text-muted);
        font-size: var(--eds-font-size-xs);
        font-weight: var(--eds-font-weight-semibold);
        flex-shrink: 0;
        transition:
          border-color var(--eds-duration-fast) var(--eds-easing-standard),
          background-color var(--eds-duration-fast) var(--eds-easing-standard),
          color var(--eds-duration-fast) var(--eds-easing-standard);
      }

      .step[data-state='current'] .indicator {
        border-color: var(--eds-color-primary);
        background: var(--eds-color-primary);
        color: var(--eds-color-surface);
      }

      .step[data-state='completed'] .indicator {
        border-color: var(--eds-color-primary);
        background: var(--eds-color-brand-50);
        color: var(--eds-color-primary);
      }

      .connector {
        flex: 1;
        min-width: 1rem;
        height: 2px;
        margin-inline: var(--eds-space-2);
        background: var(--eds-color-border);
      }

      .stepper[data-orientation='vertical'] .connector {
        width: 2px;
        min-height: 1.5rem;
        height: auto;
        margin: var(--eds-space-1) 0 0;
        margin-inline: 0;
        align-self: center;
      }

      .step[data-state='completed'] .connector,
      .step[data-state='current'] .connector {
        background: var(--eds-color-primary);
      }

      .content {
        display: flex;
        flex-direction: column;
        gap: var(--eds-space-1);
        min-width: 0;
        padding-top: 0.125rem;
      }

      .stepper[data-orientation='horizontal'] .content {
        display: none;
      }

      .label {
        font-size: var(--eds-font-size-sm);
        font-weight: var(--eds-font-weight-semibold);
        color: var(--eds-color-text);
        line-height: var(--eds-line-height-snug);
      }

      .step[data-state='upcoming'] .label {
        color: var(--eds-color-text-muted);
        font-weight: var(--eds-font-weight-medium);
      }

      .description {
        font-size: var(--eds-font-size-xs);
        line-height: var(--eds-line-height-normal);
        color: var(--eds-color-text-muted);
      }

      .check {
        width: 0.875rem;
        height: 0.875rem;
      }
    `,
  ];

  @property({ type: Array })
  steps: EdsStepperStep[] = [];

  @property({ type: Number })
  current = 0;

  @property({ reflect: true })
  orientation: EdsStepperOrientation = 'horizontal';

  private stepState(index: number): 'completed' | 'current' | 'upcoming' {
    if (index < this.current) return 'completed';
    if (index === this.current) return 'current';
    return 'upcoming';
  }

  private isClickable(index: number): boolean {
    return index <= this.current;
  }

  private handleStepClick(index: number) {
    if (!this.isClickable(index)) return;
    this.dispatchEvent(
      new CustomEvent('eds-step-click', {
        detail: { index },
        bubbles: true,
        composed: true,
      }),
    );
  }

  private renderIndicator(index: number, state: 'completed' | 'current' | 'upcoming') {
    if (state === 'completed') {
      return html`
        <span class="indicator" aria-hidden="true">
          <svg class="check" viewBox="0 0 16 16" fill="none">
            <path
              d="M3.5 8.5L6.5 11.5L12.5 4.5"
              stroke="currentColor"
              stroke-width="1.75"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </span>
      `;
    }

    return html`<span class="indicator" aria-hidden="true">${index + 1}</span>`;
  }

  override render() {
    const lastIndex = this.steps.length - 1;

    return html`
      <ol class="stepper" data-orientation=${this.orientation} aria-label="Progress">
        ${this.steps.map((step, index) => {
          const state = this.stepState(index);
          const clickable = this.isClickable(index);
          const showConnector = index < lastIndex;

          return html`
            <li
              class="step"
              data-state=${state}
              aria-current=${state === 'current' ? 'step' : nothing}
            >
              <button
                type="button"
                class="step-button"
                data-clickable=${clickable ? 'true' : 'false'}
                ?disabled=${!clickable}
                aria-label=${`${step.label}, step ${index + 1} of ${this.steps.length}`}
                @click=${() => this.handleStepClick(index)}
              >
                <span class="indicator-wrap">
                  ${this.renderIndicator(index, state)}
                  ${showConnector && this.orientation === 'horizontal'
                    ? html`<span class="connector" aria-hidden="true"></span>`
                    : nothing}
                </span>
                <span class="content">
                  <span class="label">${step.label}</span>
                  ${step.description
                    ? html`<span class="description">${step.description}</span>`
                    : nothing}
                </span>
              </button>
              ${showConnector && this.orientation === 'vertical'
                ? html`<span class="connector" aria-hidden="true"></span>`
                : nothing}
            </li>
          `;
        })}
      </ol>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'eds-stepper': EdsStepper;
  }
}
