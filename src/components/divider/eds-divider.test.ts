import { describe, it, expect, beforeEach } from 'vitest';
import { mount, resetDom, shadowQuery } from '../../test/helpers.js';
import './eds-divider.js';
import type { EdsDivider } from './eds-divider.js';

describe('eds-divider', () => {
  beforeEach(() => {
    resetDom();
  });

  it('renders a horizontal separator by default', async () => {
    const el = await mount<EdsDivider>('eds-divider');

    expect(el.orientation).toBe('horizontal');
    expect(shadowQuery(el, '[role="separator"]').getAttribute('aria-orientation')).toBe('horizontal');
  });

  it('renders a labeled horizontal divider', async () => {
    const el = await mount<EdsDivider>('eds-divider', (node) => {
      node.label = 'Or';
    });

    expect(shadowQuery(el, '.label').textContent).toBe('Or');
    expect(shadowQuery(el, '.divider.labeled')).toBeTruthy();
  });

  it('reflects vertical orientation on the host', async () => {
    const el = await mount<EdsDivider>('eds-divider', (node) => {
      node.orientation = 'vertical';
      node.spacing = 'lg';
    });

    expect(el.getAttribute('orientation')).toBe('vertical');
    expect(el.getAttribute('spacing')).toBe('lg');
  });
});
