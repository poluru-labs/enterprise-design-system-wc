import { describe, it, expect, beforeEach } from 'vitest';
import { mount, resetDom, nextEvent, shadowQuery } from '../../test/helpers.js';
import './eds-slider.js';
import type { EdsSlider } from './eds-slider.js';

describe('eds-slider', () => {
  beforeEach(() => resetDom());

  it('renders a range input with label', async () => {
    const el = await mount<EdsSlider>('eds-slider', (el) => {
      el.label = 'Volume';
      el.min = 0;
      el.max = 100;
      el.value = 50;
    });

    const range = shadowQuery<HTMLInputElement>(el, 'input[type="range"]');
    expect(range.min).toBe('0');
    expect(range.max).toBe('100');
    expect(range.value).toBe('50');
  });

  it('shows the current value when show-value is set', async () => {
    const el = await mount<EdsSlider>('eds-slider', (el) => {
      el.value = 75;
      el.showValue = true;
    });

    expect(shadowQuery<HTMLSpanElement>(el, '.value').textContent).toBe('75');
  });

  it('emits eds-input while the value changes', async () => {
    const el = await mount<EdsSlider>('eds-slider', (el) => {
      el.value = 10;
    });

    const range = shadowQuery<HTMLInputElement>(el, 'input[type="range"]');
    const inputPromise = nextEvent<{ value: number }>(el, 'eds-input');

    range.value = '40';
    range.dispatchEvent(new Event('input', { bubbles: true }));

    const event = await inputPromise;
    expect(event.detail.value).toBe(40);
    expect(el.value).toBe(40);
  });

  it('emits eds-change when the value is committed', async () => {
    const el = await mount<EdsSlider>('eds-slider', (node) => {
      node.value = 10;
    });

    const range = shadowQuery<HTMLInputElement>(el, 'input[type="range"]');
    range.value = '55';
    range.dispatchEvent(new Event('input', { bubbles: true }));
    await el.updateComplete;

    const changePromise = nextEvent<{ value: number }>(el, 'eds-change');
    range.dispatchEvent(new Event('change', { bubbles: true }));

    expect((await changePromise).detail.value).toBe(55);
  });
});
