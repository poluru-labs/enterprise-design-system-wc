import { describe, it, expect, beforeEach } from 'vitest';
import type { LitElement } from 'lit';
import './eds-split-button.js';
import '../dropdown-menu/eds-dropdown-menu.js';
import type { EdsSplitButton } from './eds-split-button.js';
import { mount, resetDom, nextEvent, shadowQuery } from '../../test/helpers.js';

describe('eds-split-button', () => {
  beforeEach(() => {
    resetDom();
  });

  it('renders the primary action label', async () => {
    const el = await mount<EdsSplitButton>('eds-split-button', (node) => {
      node.label = 'Save';
    });

    const primary = shadowQuery(el, 'eds-button.primary-action');
    expect(primary.textContent?.trim()).toBe('Save');
  });

  it('emits eds-click when the primary action is activated', async () => {
    const el = await mount<EdsSplitButton>('eds-split-button', (node) => {
      node.label = 'Save';
    });

    const eventPromise = nextEvent(el, 'eds-click');
    const primary = shadowQuery(el, 'eds-button.primary-action');
    primary.shadowRoot?.querySelector<HTMLButtonElement>('button')?.click();

    await eventPromise;
  });

  it('does not emit eds-click when disabled', async () => {
    const el = await mount<EdsSplitButton>('eds-split-button', (node) => {
      node.label = 'Save';
      node.disabled = true;
    });

    let fired = false;
    el.addEventListener('eds-click', () => {
      fired = true;
    });

    const primary = shadowQuery(el, 'eds-button.primary-action');
    primary.shadowRoot?.querySelector<HTMLButtonElement>('button')?.click();
    expect(fired).toBe(false);
  });

  it('emits eds-select when a menu item is chosen', async () => {
    const el = await mount<EdsSplitButton>('eds-split-button', (node) => {
      node.label = 'Save';
      node.innerHTML = `
        <eds-menu-item label="Save as" value="save-as"></eds-menu-item>
      `;
    });
    await el.updateComplete;

    const menu = shadowQuery(el, 'eds-dropdown-menu') as LitElement;
    const select = nextEvent<{ value: string }>(el, 'eds-select');
    menu.dispatchEvent(
      new CustomEvent('eds-select', {
        detail: { value: 'save-as', label: 'Save as' },
        bubbles: true,
        composed: true,
      }),
    );

    expect((await select).detail.value).toBe('save-as');
  });
});
