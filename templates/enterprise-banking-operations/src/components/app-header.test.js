import { describe, expect, it, beforeEach } from 'vitest';
import './app-header.js';

describe('aurevia-header', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('registers the custom element', () => {
    expect(customElements.get('aurevia-header')).toBeDefined();
  });

  it('renders the clearing-rail header with stages and liquidity chip', () => {
    const header = document.createElement('aurevia-header');
    header.setAttribute('product', 'Aurevia');
    header.setAttribute('workspace', 'Poluru National');
    header.setAttribute('liquidity-label', '$2.4B available');
    header.clearingStages = [
      { id: 'received', label: 'Received', count: 2, href: '#/payments' },
      { id: 'held', label: 'Held', count: 2, href: '#/exceptions', hot: true },
    ];
    document.body.appendChild(header);

    const root = header.shadowRoot;
    expect(root?.textContent).toContain('Aurevia');
    expect(root?.textContent).toContain('Poluru National');
    expect(root?.textContent).toContain('Received');
    expect(root?.textContent).toContain('Held');
    expect(root?.textContent).toContain('$2.4B available');
    expect(root?.querySelector('.clearing-strip')).toBeTruthy();
    expect(root?.querySelector('.liquidity-chip')).toBeTruthy();
    expect(root?.querySelector('.claim-strip')).toBeFalsy();
    expect(root?.querySelector('.scoreboard')).toBeFalsy();
    expect(root?.querySelector('.mix-strip')).toBeFalsy();
  });
});
