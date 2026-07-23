import { describe, it, expect, beforeEach } from 'vitest';
import { mount, resetDom, shadowQuery } from '../../test/helpers.js';
import './eds-spinner.js';
import type { EdsSpinner } from './eds-spinner.js';

describe('eds-spinner', () => {
  beforeEach(() => {
    resetDom();
  });

  it('renders with default size and screen-reader label', async () => {
    const el = await mount<EdsSpinner>('eds-spinner');

    expect(el.size).toBe('md');
    expect(shadowQuery(el, '.spinner.md')).toBeTruthy();
    expect(shadowQuery(el, '.sr-only').textContent).toBe('Loading');
  });

  it('shows a visible label when show-label is true', async () => {
    const el = await mount<EdsSpinner>('eds-spinner', (node) => {
      node.label = 'Fetching data';
      node.showLabel = true;
    });

    expect(shadowQuery(el, '.label').textContent).toBe('Fetching data');
  });

  it('reflects size on the spinner container', async () => {
    const el = await mount<EdsSpinner>('eds-spinner', (node) => {
      node.size = 'lg';
    });

    expect(shadowQuery(el, '.spinner.lg .ring')).toBeTruthy();
    expect(shadowQuery(el, '[role="status"]').getAttribute('aria-busy')).toBe('true');
  });
});
