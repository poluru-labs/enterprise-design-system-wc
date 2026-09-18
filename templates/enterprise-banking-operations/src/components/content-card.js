const cardStyles = `
  :host {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  article {
    display: flex;
    flex-direction: column;
    height: 100%;
    border: 1px solid var(--st-rule, #c5d4de);
    border-radius: 12px;
    background: var(--st-sheet, #fff);
    box-shadow: 0 1px 0 rgb(16 36 51 / 0.03);
  }

  header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 0.75rem;
    padding: 1rem 1.1rem 0.35rem;
  }

  header:empty {
    display: none;
  }

  .body {
    display: flex;
    flex-direction: column;
    flex: 1;
    gap: 0.35rem;
    padding: 0.35rem 1.1rem 1.05rem;
  }

  footer {
    padding: 0 1.1rem 1rem;
    margin-top: auto;
  }

  footer:empty {
    display: none;
  }

  ::slotted(h2) {
    margin: 0;
    font-family: 'Source Serif 4', serif;
    font-size: 1.02rem;
  }

  ::slotted(.muted) {
    color: var(--st-mute, #4d6574);
  }
`;

export class ContentCard extends HTMLElement {
  static get observedAttributes() {
    return ['href'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.shadowRoot.querySelector('article')?.addEventListener('click', (event) => {
      const href = this.getAttribute('href');
      if (!href || event.defaultPrevented) return;
      const target = event.target;
      if (target instanceof Element && target.closest('a, button, eds-button, eds-link, input, textarea, select')) return;
      window.location.hash = href.startsWith('#') ? href : `#${href}`;
    });
  }

  attributeChangedCallback() {
    if (this.isConnected) this.render();
  }

  render() {
    const href = this.getAttribute('href');
    const role = href ? 'link' : 'group';
    const tabindex = href ? '0' : '-1';
    this.shadowRoot.innerHTML = `
      <style>${cardStyles}</style>
      <article role="${role}" tabindex="${tabindex}" ${href ? `data-href="${href}"` : ''}>
        <header><slot name="header"></slot></header>
        <div class="body"><slot></slot></div>
        <footer><slot name="footer"></slot></footer>
      </article>
    `;
  }
}

if (!customElements.get('content-card')) {
  customElements.define('content-card', ContentCard);
}
