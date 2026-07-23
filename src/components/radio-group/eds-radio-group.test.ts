import { describe, it, expect, beforeEach } from 'vitest';
import { mount, resetDom, nextEvent, shadowQuery } from '../../test/helpers.js';
import './eds-radio-group.js';
import type { EdsRadioGroup, EdsRadio } from './eds-radio-group.js';

describe('eds-radio-group', () => {
  beforeEach(() => resetDom());

  it('renders slotted radio options', async () => {
    const el = await mount<EdsRadioGroup>('eds-radio-group', (group) => {
      group.label = 'Size';
      group.name = 'size';

      const small = document.createElement('eds-radio') as EdsRadio;
      small.value = 'sm';
      small.label = 'Small';

      const large = document.createElement('eds-radio') as EdsRadio;
      large.value = 'lg';
      large.label = 'Large';

      group.append(small, large);
    });

    expect(el.querySelectorAll('eds-radio').length).toBe(2);
    expect(shadowQuery<HTMLLegendElement>(el, 'legend.label').textContent).toBe('Size');
  });

  it('syncs checked state from the value prop', async () => {
    const el = await mount<EdsRadioGroup>('eds-radio-group', (group) => {
      group.name = 'size';
      group.value = 'lg';

      const small = document.createElement('eds-radio') as EdsRadio;
      small.value = 'sm';
      small.label = 'Small';

      const large = document.createElement('eds-radio') as EdsRadio;
      large.value = 'lg';
      large.label = 'Large';

      group.append(small, large);
    });

    await el.updateComplete;
    const radios = el.querySelectorAll<EdsRadio>('eds-radio');
    expect(radios[0].checked).toBe(false);
    expect(radios[1].checked).toBe(true);
  });

  it('emits eds-change when a radio is selected', async () => {
    const el = await mount<EdsRadioGroup>('eds-radio-group', (group) => {
      group.name = 'size';

      const small = document.createElement('eds-radio') as EdsRadio;
      small.value = 'sm';
      small.label = 'Small';

      const large = document.createElement('eds-radio') as EdsRadio;
      large.value = 'lg';
      large.label = 'Large';

      group.append(small, large);
    });

    await el.updateComplete;
    const changePromise = nextEvent<{ value: string }>(el, 'eds-change');
    el.querySelectorAll<EdsRadio>('eds-radio')[1].shadowRoot
      ?.querySelector<HTMLInputElement>('input')
      ?.click();

    const event = await changePromise;
    expect(event.detail.value).toBe('lg');
    expect(el.value).toBe('lg');
  });
});
