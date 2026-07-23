import { describe, it, expect, beforeEach } from 'vitest';
import { mount, resetDom, nextEvent, shadowQuery } from '../../test/helpers.js';
import './eds-tag.js';
import type { EdsTag } from './eds-tag.js';

describe('eds-tag', () => {
  beforeEach(() => {
    resetDom();
  });

  it('renders label with default neutral variant', async () => {
    const el = await mount<EdsTag>('eds-tag', (node) => {
      node.label = 'Draft';
    });

    expect(el.variant).toBe('neutral');
    expect(shadowQuery(el, '.tag.neutral .label').textContent?.trim()).toBe('Draft');
  });

  it('reflects variant classes on the tag', async () => {
    const el = await mount<EdsTag>('eds-tag', (node) => {
      node.label = 'Beta';
      node.variant = 'brand';
    });

    expect(shadowQuery(el, '.tag.brand')).toBeTruthy();
  });

  it('emits eds-dismiss when dismissible', async () => {
    const el = await mount<EdsTag>('eds-tag', (node) => {
      node.label = 'Removable';
      node.dismissible = true;
    });
    const dismiss = nextEvent(el, 'eds-dismiss');

    shadowQuery<HTMLButtonElement>(el, '.dismiss').click();
    await dismiss;

    expect(true).toBe(true);
  });
});
