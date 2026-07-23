import { describe, it, expect, beforeEach } from 'vitest';
import { mount, resetDom, nextEvent, shadowQuery, shadowQueryAll } from '../../test/helpers.js';
import './eds-number-input.js';
import type { EdsNumberInput } from './eds-number-input.js';

describe('eds-number-input', () => {
  beforeEach(() => resetDom());

  it('renders a number input with stepper buttons', async () => {
    const el = await mount<EdsNumberInput>('eds-number-input', (el) => {
      el.label = 'Quantity';
      el.value = 5;
    });

    expect(shadowQuery<HTMLInputElement>(el, 'input.control').value).toBe('5');
    expect(shadowQueryAll<HTMLButtonElement>(el, 'button.stepper').length).toBe(2);
  });

  it('reflects disabled state on controls', async () => {
    const el = await mount<EdsNumberInput>('eds-number-input', (el) => {
      el.disabled = true;
    });

    expect(shadowQuery<HTMLInputElement>(el, 'input.control').disabled).toBe(true);
  });

  it('emits eds-change when increment is clicked', async () => {
    const el = await mount<EdsNumberInput>('eds-number-input', (el) => {
      el.value = 0;
      el.step = 1;
      el.min = 0;
      el.max = 10;
    });

    const [, increment] = shadowQueryAll<HTMLButtonElement>(el, 'button.stepper');
    const changePromise = nextEvent<{ value: number }>(el, 'eds-change');

    increment.click();

    const event = await changePromise;
    expect(event.detail.value).toBe(1);
    expect(el.value).toBe(1);
  });

  it('updates from typed input and shows validation messaging', async () => {
    const el = await mount<EdsNumberInput>('eds-number-input', (node) => {
      node.value = 2;
      node.min = 0;
      node.max = 10;
      node.step = 1;
      node.invalid = true;
      node.errorMessage = 'Out of range';
      node.hint = 'Use steppers';
    });

    expect(shadowQuery(el, '.error').textContent).toBe('Out of range');

    const input = shadowQuery<HTMLInputElement>(el, 'input.control');
    const inputPromise = nextEvent<{ value: number }>(el, 'eds-input');
    input.value = '4';
    input.dispatchEvent(new InputEvent('input', { bubbles: true, composed: true }));
    expect((await inputPromise).detail.value).toBe(4);

    const changePromise = nextEvent<{ value: number }>(el, 'eds-change');
    input.value = '6';
    input.dispatchEvent(new Event('change', { bubbles: true }));
    expect((await changePromise).detail.value).toBe(6);

    const [decrement] = shadowQueryAll<HTMLButtonElement>(el, 'button.stepper');
    decrement.click();
    await el.updateComplete;
    expect(el.value).toBe(5);
  });
});
