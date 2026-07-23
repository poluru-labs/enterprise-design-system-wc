import { describe, it, expect, beforeEach } from 'vitest';
import { mount, resetDom, nextEvent, shadowQuery } from '../../test/helpers.js';
import './eds-textarea.js';
import type { EdsTextarea } from './eds-textarea.js';

describe('eds-textarea', () => {
  beforeEach(() => resetDom());

  it('renders a textarea control', async () => {
    const el = await mount<EdsTextarea>('eds-textarea', (el) => {
      el.label = 'Notes';
      el.placeholder = 'Enter notes';
    });

    const textarea = shadowQuery<HTMLTextAreaElement>(el, 'textarea.control');
    expect(textarea).toBeTruthy();
    expect(textarea.placeholder).toBe('Enter notes');
  });

  it('reflects the value property', async () => {
    const el = await mount<EdsTextarea>('eds-textarea', (el) => {
      el.value = 'Draft text';
    });

    expect(shadowQuery<HTMLTextAreaElement>(el, 'textarea.control').value).toBe('Draft text');
  });

  it('emits eds-input on keystrokes', async () => {
    const el = await mount<EdsTextarea>('eds-textarea');
    const textarea = shadowQuery<HTMLTextAreaElement>(el, 'textarea.control');
    const inputPromise = nextEvent<{ value: string }>(el, 'eds-input');

    textarea.value = 'Updated';
    textarea.dispatchEvent(new InputEvent('input', { bubbles: true, composed: true }));

    const event = await inputPromise;
    expect(event.detail.value).toBe('Updated');
  });

  it('emits eds-change and renders hint or error messaging', async () => {
    const el = await mount<EdsTextarea>('eds-textarea', (node) => {
      node.hint = 'Be concise';
    });
    expect(shadowQuery(el, '.hint').textContent).toBe('Be concise');

    const changePromise = nextEvent(el, 'eds-change');
    shadowQuery<HTMLTextAreaElement>(el, 'textarea.control').dispatchEvent(
      new Event('change', { bubbles: true }),
    );
    await changePromise;

    el.invalid = true;
    el.errorMessage = 'Too long';
    await el.updateComplete;
    expect(shadowQuery(el, '.error').textContent).toBe('Too long');
  });
});
