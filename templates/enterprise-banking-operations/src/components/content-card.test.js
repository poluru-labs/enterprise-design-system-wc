import { describe, expect, it, beforeEach } from 'vitest';
import './content-card.js';

describe('content-card', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('registers the custom element', () => {
    expect(customElements.get('content-card')).toBeDefined();
  });

  it('renders header, default, and footer slots when connected', () => {
    document.body.innerHTML = `
      <content-card>
        <div slot="header"><h2>Finance</h2></div>
        <p>Margin and cash</p>
        <div slot="footer"><span>Updated</span></div>
      </content-card>
    `;
    const card = document.querySelector('content-card');
    expect(card).toBeTruthy();
    expect(card.shadowRoot?.querySelector('header slot')).toBeTruthy();
    expect(card.shadowRoot?.querySelector('.body slot')).toBeTruthy();
    expect(card.shadowRoot?.querySelector('footer slot')).toBeTruthy();
    expect(card.shadowRoot?.querySelector('article')).toBeTruthy();
  });

  it('uses flex column host styles for equal-height grids', () => {
    document.body.innerHTML = '<content-card><p>Body</p></content-card>';
    const styles = document.querySelector('content-card')?.shadowRoot?.querySelector('style')?.textContent ?? '';
    expect(styles).toContain('display: flex');
    expect(styles).toContain('height: 100%');
  });
});
