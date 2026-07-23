import { describe, it, expect, beforeEach } from 'vitest';
import { mount, resetDom, nextEvent, shadowQuery } from '../../test/helpers.js';
import './eds-button.js';
import type { EdsButton } from './eds-button.js';

describe('eds-button', () => {
  beforeEach(() => resetDom());

  it('renders a native button with slotted label', async () => {
    const el = await mount<EdsButton>('eds-button', (el) => {
      el.textContent = 'Save';
    });

    expect(shadowQuery<HTMLButtonElement>(el, 'button')).toBeTruthy();
    expect(el.variant).toBe('primary');
  });

  it('reflects disabled state', async () => {
    const el = await mount<EdsButton>('eds-button', (el) => {
      el.disabled = true;
    });

    expect(shadowQuery<HTMLButtonElement>(el, 'button').disabled).toBe(true);
  });

  it('emits eds-click when activated', async () => {
    const el = await mount<EdsButton>('eds-button', (el) => {
      el.textContent = 'Go';
    });

    const clickPromise = nextEvent(el, 'eds-click');
    shadowQuery<HTMLButtonElement>(el, 'button').click();

    await clickPromise;
  });
});
