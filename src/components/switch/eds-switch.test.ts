import { describe, it, expect, beforeEach } from 'vitest';
import { mount, resetDom, nextEvent, shadowQuery } from '../../test/helpers.js';
import './eds-switch.js';
import type { EdsSwitch } from './eds-switch.js';

describe('eds-switch', () => {
  beforeEach(() => resetDom());

  it('renders a switch with label', async () => {
    const el = await mount<EdsSwitch>('eds-switch', (el) => {
      el.label = 'Notifications';
    });

    expect(shadowQuery<HTMLSpanElement>(el, '.label-text').textContent).toBe('Notifications');
    expect(shadowQuery<HTMLInputElement>(el, 'input').getAttribute('role')).toBe('switch');
  });

  it('reflects the checked property', async () => {
    const el = await mount<EdsSwitch>('eds-switch', (el) => {
      el.checked = true;
    });

    expect(shadowQuery<HTMLInputElement>(el, 'input').checked).toBe(true);
  });

  it('emits eds-change when toggled', async () => {
    const el = await mount<EdsSwitch>('eds-switch');
    const changePromise = nextEvent<{ checked: boolean }>(el, 'eds-change');

    shadowQuery<HTMLInputElement>(el, 'input').click();

    const event = await changePromise;
    expect(event.detail.checked).toBe(true);
    expect(el.checked).toBe(true);
  });
});
