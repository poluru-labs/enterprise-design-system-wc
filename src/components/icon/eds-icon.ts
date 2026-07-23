import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { hostBase } from '../../foundations/shared.js';
import { iconPaths, isEdsIconName, type EdsIconName } from '../../icons/paths.js';

export type EdsIconSize = 'sm' | 'md' | 'lg';

/**
 * Built-in SVG icon from the design system set.
 *
 * @example
 * ```html
 * <eds-icon name="search" size="md"></eds-icon>
 * ```
 *
 * @element eds-icon
 */
@customElement('eds-icon')
export class EdsIcon extends LitElement {
  static override styles = [
    hostBase,
    css`
      :host {
        display: inline-flex;
        vertical-align: middle;
        line-height: 0;
        color: inherit;
      }

      svg {
        display: block;
        flex-shrink: 0;
      }

      .sm {
        width: 1rem;
        height: 1rem;
      }

      .md {
        width: 1.25rem;
        height: 1.25rem;
      }

      .lg {
        width: 1.5rem;
        height: 1.5rem;
      }
    `,
  ];

  @property({ reflect: true })
  name: EdsIconName | '' = 'check';

  @property({ reflect: true })
  size: EdsIconSize = 'md';

  @property({ type: Boolean, reflect: true })
  decorative = true;

  @property()
  label = '';

  override render() {
    if (!this.name || !isEdsIconName(this.name)) {
      return nothing;
    }

    const paths = iconPaths[this.name];
    const labelled = !this.decorative && Boolean(this.label || this.name);

    return html`
      <svg
        class=${classMap({ [this.size]: true })}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden=${labelled ? 'false' : 'true'}
        role=${labelled ? 'img' : 'presentation'}
        aria-label=${ifDefined(labelled ? this.label || this.name : undefined)}
      >
        ${paths}
      </svg>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'eds-icon': EdsIcon;
  }
}
