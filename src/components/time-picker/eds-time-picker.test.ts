import { describe, it, expect, beforeEach } from 'vitest';
import { mount, resetDom, nextEvent, shadowQuery } from '../../test/helpers.js';
import './eds-time-picker.js';
import type { EdsTimePicker } from './eds-time-picker.js';

describe('eds-time-picker', () => {
  beforeEach(() => resetDom());

  it('renders a native time input', async () => {
    const el = await mount<EdsTimePicker>('eds-time-picker', (el) => {
      el.label = 'Start time';
    });

    expect(shadowQuery<HTMLInputElement>(el, 'input.control').type).toBe('time');
  });

  it('reflects the value property', async () => {
    const el = await mount<EdsTimePicker>('eds-time-picker', (el) => {
      el.value = '09:30';
    });

    expect(shadowQuery<HTMLInputElement>(el, 'input.control').value).toBe('09:30');
  });

  it('emits eds-change when the time changes', async () => {
    const el = await mount<EdsTimePicker>('eds-time-picker');
    const input = shadowQuery<HTMLInputElement>(el, 'input.control');
    const changePromise = nextEvent<{ value: string }>(el, 'eds-change');

    input.value = '14:45';
    input.dispatchEvent(new Event('change', { bubbles: true }));

    const event = await changePromise;
    expect(event.detail.value).toBe('14:45');
    expect(el.value).toBe('14:45');
  });

  it('renders hint and error messaging', async () => {
    const el = await mount<EdsTimePicker>('eds-time-picker', (node) => {
      node.hint = 'Business hours';
    });
    expect(shadowQuery(el, '.hint').textContent).toBe('Business hours');

    el.invalid = true;
    el.errorMessage = 'Invalid time';
    await el.updateComplete;
    expect(shadowQuery(el, '.error').textContent).toBe('Invalid time');
  });
});
