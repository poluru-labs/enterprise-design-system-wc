import { describe, it, expect, beforeEach } from 'vitest';
import { mount, resetDom, nextEvent, shadowQuery } from '../../test/helpers.js';
import './eds-checkbox.js';
import type { EdsCheckbox } from './eds-checkbox.js';

describe('eds-checkbox', () => {
  beforeEach(() => resetDom());

  it('renders with a label', async () => {
    const el = await mount<EdsCheckbox>('eds-checkbox', (el) => {
      el.label = 'Accept terms';
    });

    expect(shadowQuery<HTMLSpanElement>(el, '.label-text').textContent).toBe('Accept terms');
    expect(shadowQuery<HTMLInputElement>(el, 'input').type).toBe('checkbox');
  });

  it('reflects the checked property', async () => {
    const el = await mount<EdsCheckbox>('eds-checkbox', (el) => {
      el.checked = true;
    });

    expect(shadowQuery<HTMLInputElement>(el, 'input').checked).toBe(true);
    expect(el.checked).toBe(true);
  });

  it('emits eds-change when toggled', async () => {
    const el = await mount<EdsCheckbox>('eds-checkbox');
    const input = shadowQuery<HTMLInputElement>(el, 'input');
    const changePromise = nextEvent<{ checked: boolean }>(el, 'eds-change');

    input.click();

    const event = await changePromise;
    expect(event.detail.checked).toBe(true);
    expect(el.checked).toBe(true);
  });
});
