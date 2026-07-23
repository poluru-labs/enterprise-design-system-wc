import { describe, it, expect, beforeEach } from 'vitest';
import { mount, resetDom, nextEvent, shadowQuery } from '../../test/helpers.js';
import { ensureToastHost, showToast } from './eds-toast.js';
import './eds-toast.js';
import type { EdsToast } from './eds-toast.js';

describe('eds-toast', () => {
  beforeEach(() => {
    resetDom();
  });

  it('renders message and variant when open', async () => {
    const el = await mount<EdsToast>('eds-toast', (node) => {
      node.message = 'Saved successfully';
      node.variant = 'success';
      node.open = true;
    });

    expect(shadowQuery(el, '.toast.success').getAttribute('data-open')).toBe('true');
    expect(shadowQuery(el, '.message').textContent).toBe('Saved successfully');
  });

  it('emits eds-close when dismissed manually', async () => {
    const el = await mount<EdsToast>('eds-toast', (node) => {
      node.message = 'Notice';
      node.open = true;
    });
    const closeEvent = nextEvent(el, 'eds-close');

    shadowQuery<HTMLButtonElement>(el, '.close').click();
    await closeEvent;

    expect(el.open).toBe(false);
  });

  it('ensureToastHost creates a global toast host on document.body', () => {
    const host = ensureToastHost();

    expect(host.tagName.toLowerCase()).toBe('eds-toast-host');
    expect(document.getElementById('eds-toast-host-root')).toBe(host);
  });

  it('showToast displays a toast via the global host', async () => {
    const toast = showToast({ message: 'Hello from toast', variant: 'info' });
    await toast.updateComplete;

    expect(toast.message).toBe('Hello from toast');
    expect(toast.open).toBe(true);
    expect(document.querySelector('eds-toast-host eds-toast')).toBeTruthy();
  });
});
