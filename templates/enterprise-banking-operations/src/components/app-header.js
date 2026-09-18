import headerCss from '../styles/header.css?inline';

function brandMark() {
  return `
    <svg viewBox="0 0 32 32" width="28" height="28" aria-hidden="true">
      <rect width="32" height="32" rx="9" fill="#0B3D5C"></rect>
      <path d="M6 13 L16 7.5 L26 13" fill="none" stroke="#E8C97A" stroke-width="1.8" stroke-linejoin="round"></path>
      <path d="M7.5 13.2h17" stroke="#fff" stroke-width="1.6"></path>
      <path d="M9 13.2v10M16 13.2v10M23 13.2v10" stroke="#fff" stroke-width="1.8" stroke-linecap="round"></path>
      <path d="M7 23.5h18" stroke="#fff" stroke-width="1.8" stroke-linecap="round"></path>
    </svg>
  `;
}

export class AureviaHeader extends HTMLElement {
  static get observedAttributes() {
    return ['product', 'workspace', 'inbox-count', 'liquidity-label'];
  }

  #stages = [];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.shadowRoot.addEventListener('click', (event) => {
      const cell = event.target.closest('.rail-cell');
      if (cell?.dataset.href) window.location.hash = cell.dataset.href;
    });
  }

  attributeChangedCallback() {
    if (this.isConnected) this.render();
  }

  get product() {
    return this.getAttribute('product') || 'Aurevia';
  }

  get workspace() {
    return this.getAttribute('workspace') || 'Poluru National';
  }

  get inboxCount() {
    return this.getAttribute('inbox-count') || '4';
  }

  get liquidityLabel() {
    return this.getAttribute('liquidity-label') || '$2.4B available';
  }

  set clearingStages(value) {
    this.#stages = Array.isArray(value) ? value : [];
    if (this.isConnected) this.render();
  }

  get clearingStages() {
    return this.#stages;
  }

  render() {
    const stages = this.#stages.length
      ? this.#stages
      : [
          { id: 'received', label: 'Received', count: 2, href: '#/payments' },
          { id: 'posted', label: 'Posted', count: 3, href: '#/accounts', hot: true },
          { id: 'held', label: 'Held', count: 2, href: '#/exceptions' },
          { id: 'settled', label: 'Settled', count: 1, href: '#/clearing' },
        ];

    this.shadowRoot.innerHTML = `
      <style>${headerCss}</style>
      <div class="header-shell">
        <div class="header-bar">
          <div class="header-start">
            <slot name="nav-toggle"></slot>
            <a class="header-brand" href="#/overview" part="brand">
              <span class="brand-mark">${brandMark()}</span>
              <span class="brand-copy">
                <strong>${this.product}</strong>
                <small>${this.workspace}</small>
              </span>
            </a>
            <slot name="crumbs"></slot>
          </div>
          <div class="header-search">
            <slot name="search"></slot>
          </div>
          <div class="header-end">
            <span class="search-hint"><slot name="kbd"></slot></span>
            <slot name="add"></slot>
            <div class="inbox-wrap">
              <slot name="inbox"></slot>
              <span class="inbox-count" aria-label="${this.inboxCount} unread">${this.inboxCount}</span>
            </div>
            <slot name="profile"></slot>
          </div>
        </div>
        <div class="clearing-strip" aria-label="Clearing rail">
          ${stages
            .map(
              (stage) => `
            <button class="rail-cell${stage.hot ? ' is-hot' : ''}" type="button" data-href="${stage.href}">
              <span>
                <small>${stage.label}</small>
                <strong>${stage.count}</strong>
              </span>
            </button>`,
            )
            .join('')}
          <div class="liquidity-chip">
            <small>Liquidity</small>
            <strong>${this.liquidityLabel}</strong>
          </div>
        </div>
      </div>
    `;
  }
}

if (!customElements.get('aurevia-header')) {
  customElements.define('aurevia-header', AureviaHeader);
}
