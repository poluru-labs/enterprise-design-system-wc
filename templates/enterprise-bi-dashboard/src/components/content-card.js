export class ContentCard extends HTMLElement {
  static get observedAttributes() {
    return ['elevated', 'padded'];
  }

  connectedCallback() {
    if (this.dataset.wrapped === 'true') return;
    const inner = this.innerHTML;
    this.dataset.wrapped = 'true';
    const elevated = this.hasAttribute('elevated');
    const padded = !this.hasAttribute('no-pad');
    this.innerHTML = `
      <eds-card class="hx-content-card-inner" ${elevated ? 'elevated' : ''} ${padded ? 'padded' : ''}>
        ${inner}
      </eds-card>
    `;
  }
}

if (!customElements.get('hx-content-card')) {
  customElements.define('hx-content-card', ContentCard);
}

export function contentCard(inner, { elevated = true, padded = true } = {}) {
  const attrs = [
    elevated ? 'elevated' : '',
    padded ? '' : 'no-pad',
  ]
    .filter(Boolean)
    .join(' ');
  return `<hx-content-card ${attrs}>${inner}</hx-content-card>`;
}

export function cardGrid(items, colClass = 'col-sm-6 col-xl-3') {
  return `
    <section class="row g-3 stretch-row" aria-label="Cards">
      ${items.join('')}
    </section>
  `;
}

export function cardColumn(inner, colClass = 'col-sm-6 col-xl-3') {
  return `<div class="${colClass}">${contentCard(inner)}</div>`;
}
