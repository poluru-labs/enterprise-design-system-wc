import { describe, it, expect, beforeEach } from 'vitest';
import { mount, resetDom, shadowQuery } from '../../test/helpers.js';
import './eds-meter.js';
import type { EdsMeter } from './eds-meter.js';

describe('eds-meter', () => {
  beforeEach(() => {
    resetDom();
  });

  it('renders a native meter element with label', async () => {
    const el = await mount<EdsMeter>('eds-meter', (node) => {
      node.label = 'Storage used';
      node.value = 60;
    });

    expect(shadowQuery(el, '.label').textContent).toBe('Storage used');
    expect(shadowQuery(el, 'meter').getAttribute('value')).toBe('60');
  });

  it('shows formatted value text when show-value is true', async () => {
    const el = await mount<EdsMeter>('eds-meter', (node) => {
      node.value = 42;
      node.max = 100;
      node.showValue = true;
    });

    expect(shadowQuery(el, '.value').textContent).toBe('42 of 100');
  });

  it('clamps value between min and max', async () => {
    const el = await mount<EdsMeter>('eds-meter', (node) => {
      node.min = 0;
      node.max = 50;
      node.value = 75;
    });

    expect(shadowQuery(el, 'meter').getAttribute('value')).toBe('50');
  });
});
