import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { hostBase } from '../../foundations/shared.js';

export type EdsDividerOrientation = 'horizontal' | 'vertical';
export type EdsDividerSpacing = 'sm' | 'md' | 'lg';

/**
 * Visual separator between sections of content.
 *
 * @element eds-divider
 * @example
 * ```html
 * <eds-divider label="or"></eds-divider>
 * ```
 */
@customElement('eds-divider')
export class EdsDivider extends LitElement {
  static override styles = [
    hostBase,
    css`
      :host {
        vertical-align: middle;
      }

      :host([orientation='vertical']) {
        display: inline-flex;
        align-self: stretch;
        height: 100%;
        min-height: 1.5rem;
      }

      :host([orientation='horizontal']) {
        display: block;
        width: 100%;
      }

      .divider {
        display: flex;
        align-items: center;
        width: 100%;
        height: 100%;
        color: var(--eds-color-border-strong);
      }

      :host([orientation='vertical']) .divider {
        flex-direction: column;
        width: auto;
        min-height: inherit;
      }

      .line {
        flex: 1;
        background: var(--eds-color-border-strong);
      }

      :host([orientation='horizontal']) .line {
        height: 1px;
      }

      :host([orientation='vertical']) .line {
        width: 1px;
        flex: 1;
      }

      .label {
        flex: 0 0 auto;
        font-size: var(--eds-font-size-xs);
        font-weight: var(--eds-font-weight-medium);
        letter-spacing: 0.04em;
        text-transform: uppercase;
        color: var(--eds-color-text-muted);
        white-space: nowrap;
      }

      :host([orientation='horizontal']) .label {
        padding: 0 var(--eds-space-3);
      }

      :host([orientation='vertical']) .label {
        padding: var(--eds-space-3) 0;
        writing-mode: vertical-rl;
        text-orientation: mixed;
      }

      :host([spacing='sm']) {
        margin-block: var(--eds-space-2);
      }

      :host([orientation='vertical'][spacing='sm']) {
        margin-block: 0;
        margin-inline: var(--eds-space-2);
      }

      :host([spacing='md']) {
        margin-block: var(--eds-space-4);
      }

      :host([orientation='vertical'][spacing='md']) {
        margin-block: 0;
        margin-inline: var(--eds-space-4);
      }

      :host([spacing='lg']) {
        margin-block: var(--eds-space-6);
      }

      :host([orientation='vertical'][spacing='lg']) {
        margin-block: 0;
        margin-inline: var(--eds-space-6);
      }
    `,
  ];

  @property({ reflect: true })
  orientation: EdsDividerOrientation = 'horizontal';

  @property()
  label = '';

  @property({ reflect: true })
  spacing: EdsDividerSpacing = 'md';

  override render() {
    const isHorizontal = this.orientation === 'horizontal';
    const hasLabel = Boolean(this.label) && isHorizontal;

    return html`
      <div
        class=${classMap({ divider: true, labeled: hasLabel })}
        role="separator"
        aria-orientation=${this.orientation}
        aria-label=${this.label || nothing}
      >
        ${hasLabel ? html`<span class="line" aria-hidden="true"></span>` : nothing}
        ${hasLabel ? html`<span class="label">${this.label}</span>` : nothing}
        <span class="line" aria-hidden="true"></span>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'eds-divider': EdsDivider;
  }
}
