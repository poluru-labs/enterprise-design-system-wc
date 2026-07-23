import { describe, it, expect, beforeEach } from 'vitest';
import { mount, resetDom, shadowQuery } from '../../test/helpers.js';
import './eds-circular-progress.js';
import type { EdsCircularProgress } from './eds-circular-progress.js';

describe('eds-circular-progress', () => {
  beforeEach(() => {
    resetDom();
  });

  it('renders determinate progress with optional value label', async () => {
    const el = await mount<EdsCircularProgress>('eds-circular-progress', (node) => {
      node.value = 25;
      node.showValue = true;
    });

    expect(shadowQuery(el, '.value').textContent).toBe('25%');
    expect(shadowQuery(el, '[role="progressbar"]').getAttribute('aria-valuenow')).toBe('25');
  });

  it('applies custom size to the progress container', async () => {
    const el = await mount<EdsCircularProgress>('eds-circular-progress', (node) => {
      node.size = 64;
    });

    const progress = shadowQuery<HTMLElement>(el, '.progress');
    expect(progress.style.width).toBe('64px');
    expect(progress.style.height).toBe('64px');
  });

  it('uses indeterminate mode without a visible percentage', async () => {
    const el = await mount<EdsCircularProgress>('eds-circular-progress', (node) => {
      node.indeterminate = true;
      node.showValue = true;
    });

    expect(shadowQuery(el, '.progress.indeterminate')).toBeTruthy();
    expect(el.shadowRoot?.querySelector('.value')).toBeNull();
    expect(shadowQuery(el, '[role="progressbar"]').getAttribute('aria-valuetext')).toBe('Loading');
  });
});
