import { describe, it, expect, beforeEach } from 'vitest';
import { mount, resetDom, nextEvent, shadowQuery } from '../../test/helpers.js';
import './eds-modal.js';
import type { EdsModal } from './eds-modal.js';

describe('eds-modal', () => {
  beforeEach(() => {
    resetDom();
  });

  it('renders dialog content when open', async () => {
    const el = await mount<EdsModal>('eds-modal', (node) => {
      node.open = true;
      node.heading = 'Confirm action';
      node.textContent = 'Are you sure?';
    });

    expect(shadowQuery(el, '.backdrop').getAttribute('data-open')).toBe('true');
    expect(shadowQuery(el, '.title').textContent).toBe('Confirm action');
    expect(shadowQuery(el, '[role="dialog"]')).toBeTruthy();
  });

  it('does not render the dialog when closed', async () => {
    const el = await mount<EdsModal>('eds-modal');

    expect(el.shadowRoot?.querySelector('[role="dialog"]')).toBeNull();
  });

  it('emits eds-modal-open and eds-modal-close when toggled', async () => {
    const el = await mount<EdsModal>('eds-modal');
    const openEvent = nextEvent(el, 'eds-modal-open');
    const closeEvent = nextEvent(el, 'eds-modal-close');

    el.show();
    await openEvent;
    el.close();
    await closeEvent;

    expect(el.open).toBe(false);
  });

  it('closes when the close button is clicked', async () => {
    const el = await mount<EdsModal>('eds-modal', (node) => {
      node.open = true;
    });

    shadowQuery<HTMLButtonElement>(el, '.close').click();
    await el.updateComplete;

    expect(el.open).toBe(false);
  });

  it('closes on Escape when closeOnEscape is enabled', async () => {
    const el = await mount<EdsModal>('eds-modal', (node) => {
      node.open = true;
      node.closeOnEscape = true;
    });
    await el.updateComplete;

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    await el.updateComplete;

    expect(el.open).toBe(false);
  });

  it('closes when the backdrop is clicked', async () => {
    const el = await mount<EdsModal>('eds-modal', (node) => {
      node.open = true;
      node.closeOnBackdrop = true;
    });

    const backdrop = shadowQuery<HTMLElement>(el, '.backdrop');
    backdrop.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await el.updateComplete;

    expect(el.open).toBe(false);
  });

  it('traps focus with Tab and Shift+Tab around the close button', async () => {
    const el = await mount<EdsModal>('eds-modal', (node) => {
      node.open = true;
      node.heading = 'Focus trap';
    });
    await el.updateComplete;

    const close = shadowQuery<HTMLButtonElement>(el, '.close');
    close.focus();
    expect(el.shadowRoot?.activeElement).toBe(close);

    document.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Tab', shiftKey: true, bubbles: true }),
    );
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true }));

    expect(el.open).toBe(true);
    expect(el.shadowRoot?.activeElement).toBe(close);
  });
});
