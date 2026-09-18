import { describe, expect, it } from 'vitest';
import { renderAppHeader } from './app-header.js';

describe('AppHeader', () => {
  it('renders the insight ribbon with refresh clock and anomaly badge', () => {
    document.body.innerHTML = renderAppHeader({
      productName: 'Helix Analytics',
      workspace: { name: 'Harborline Analytics', lastRefresh: '2026-09-01T20:38:00.000Z' },
      anomalyCount: 4,
      currentUser: { name: 'Ananya Reddy' },
      notifications: [{ label: 'Test' }],
    });

    const header = document.querySelector('[data-testid="hx-app-header"]');
    expect(header).toBeTruthy();
    expect(header.textContent).toContain('Helix Analytics');
    expect(header.textContent).toContain('4 anomalies');
    expect(document.querySelector('#refresh-clock')).toBeTruthy();
    expect(document.querySelector('.hx-brand-helix')?.textContent).toBe('H');
  });

  it('exposes Ask Helix console, command kbd, subscriptions, and profile', () => {
    document.body.innerHTML = renderAppHeader({
      productName: 'Helix Analytics',
      workspace: { name: 'Harborline Analytics', lastRefresh: '2026-09-01T20:38:00.000Z' },
      anomalyCount: 4,
      currentUser: { name: 'Ananya Reddy' },
      notifications: [],
    });

    expect(document.querySelector('.hx-ask-prompt')?.textContent).toBe('Ask Helix /');
    expect(document.querySelector('#ask-console-input')).toBeTruthy();
    expect(document.querySelector('eds-kbd')?.getAttribute('keys')).toBe('⌘K');
    expect(document.querySelector('.hx-subscriptions-link')?.getAttribute('href')).toBe('#/subscriptions');
    expect(document.querySelector('.hx-profile-trigger')?.textContent).toContain('Ananya Reddy');
  });
});
