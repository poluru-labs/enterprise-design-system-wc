import { describe, expect, it } from 'vitest';
import './content-card.js';

describe('ContentCard', () => {
  it('registers the hx-content-card custom element', () => {
    expect(customElements.get('hx-content-card')).toBeTruthy();
  });

  it('wraps slotted markup in an eds-card shell', () => {
    document.body.innerHTML = '<hx-content-card elevated><h2>Pipeline health</h2></hx-content-card>';
    const host = document.querySelector('hx-content-card');
    expect(host?.querySelector('eds-card.hx-content-card-inner')).toBeTruthy();
    expect(host?.textContent).toContain('Pipeline health');
  });

  it('builds equal-height card columns via helpers', async () => {
    const { contentCard } = await import('./content-card.js');
    const html = contentCard('<p>Certified metric</p>');
    expect(html).toContain('hx-content-card');
    expect(html).toContain('Certified metric');
  });
});
