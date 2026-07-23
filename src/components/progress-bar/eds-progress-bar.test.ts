import { describe, it, expect, beforeEach } from 'vitest';
import { mount, resetDom, shadowQuery } from '../../test/helpers.js';
import './eds-progress-bar.js';
import type { EdsProgressBar } from './eds-progress-bar.js';

describe('eds-progress-bar', () => {
  beforeEach(() => {
    resetDom();
  });

  it('renders a progressbar with label and percentage fill', async () => {
    const el = await mount<EdsProgressBar>('eds-progress-bar', (node) => {
      node.label = 'Uploading';
      node.value = 40;
      node.showValue = true;
    });

    expect(shadowQuery(el, '.label').textContent).toBe('Uploading');
    expect(shadowQuery(el, '.value').textContent).toBe('40%');
    expect(shadowQuery<HTMLElement>(el, '.fill').style.width).toBe('40%');
  });

  it('clamps value between zero and max', async () => {
    const el = await mount<EdsProgressBar>('eds-progress-bar', (node) => {
      node.value = 150;
      node.max = 100;
    });

    const bar = shadowQuery(el, '[role="progressbar"]');
    expect(bar.getAttribute('aria-valuenow')).toBe('100');
    expect(shadowQuery<HTMLElement>(el, '.fill').style.width).toBe('100%');
  });

  it('uses indeterminate mode without a fixed width fill', async () => {
    const el = await mount<EdsProgressBar>('eds-progress-bar', (node) => {
      node.indeterminate = true;
    });

    const track = shadowQuery(el, '.track.indeterminate');
    expect(track.getAttribute('aria-valuetext')).toBe('Loading');
    expect(track.hasAttribute('aria-valuenow')).toBe(false);
  });
});
