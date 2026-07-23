import { describe, it, expect, beforeEach } from 'vitest';
import { mount, resetDom, nextEvent, shadowQuery } from '../../test/helpers.js';
import './eds-alert.js';
import type { EdsAlert } from './eds-alert.js';

describe('eds-alert', () => {
  beforeEach(() => {
    resetDom();
  });

  it('renders title and message with default variant', async () => {
    const el = await mount<EdsAlert>('eds-alert', (node) => {
      node.title = 'Heads up';
      node.message = 'Something happened';
    });

    expect(el.variant).toBe('info');
    expect(shadowQuery(el, '.alert.info')).toBeTruthy();
    expect(shadowQuery(el, '.title').textContent).toBe('Heads up');
    expect(shadowQuery(el, '.message').textContent).toBe('Something happened');
  });

  it('reflects the variant class on the alert container', async () => {
    const el = await mount<EdsAlert>('eds-alert', (node) => {
      node.variant = 'danger';
      node.message = 'Error';
    });

    expect(shadowQuery(el, '.alert.danger')).toBeTruthy();
  });

  it('emits eds-dismiss when the close button is clicked', async () => {
    const el = await mount<EdsAlert>('eds-alert', (node) => {
      node.message = 'Dismiss me';
      node.dismissible = true;
    });
    const dismiss = nextEvent(el, 'eds-dismiss');

    shadowQuery<HTMLButtonElement>(el, '.close').click();
    await dismiss;

    expect(el.hidden).toBe(true);
  });
});
