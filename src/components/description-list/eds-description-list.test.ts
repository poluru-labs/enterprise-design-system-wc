import { describe, it, expect, beforeEach } from 'vitest';
import './eds-description-list.js';
import type { EdsDescriptionList } from './eds-description-list.js';
import { mount, resetDom, shadowQuery, shadowQueryAll } from '../../test/helpers.js';

describe('eds-description-list', () => {
  beforeEach(() => {
    resetDom();
  });

  it('renders term and description pairs from items', async () => {
    const el = await mount<EdsDescriptionList>('eds-description-list', (node) => {
      node.items = [
        { term: 'Email', description: 'ada@example.com' },
        { term: 'Role', description: 'Engineer' },
      ];
    });

    const terms = shadowQueryAll(el, 'dt');
    const descriptions = shadowQueryAll(el, 'dd');
    expect(terms).toHaveLength(2);
    expect(descriptions).toHaveLength(2);
    expect(terms[0].textContent).toBe('Email');
    expect(descriptions[0].textContent).toBe('ada@example.com');
  });

  it('reflects compact styling', async () => {
    const el = await mount<EdsDescriptionList>('eds-description-list', (node) => {
      node.compact = true;
      node.items = [{ term: 'Status', description: 'Active' }];
    });

    expect(el.hasAttribute('compact')).toBe(true);
    expect(shadowQuery(el, 'dl')).toBeTruthy();
  });

  it('falls back to the default slot when items are empty', async () => {
    const el = await mount<EdsDescriptionList>('eds-description-list', (node) => {
      const term = document.createElement('dt');
      term.textContent = 'Custom';
      const description = document.createElement('dd');
      description.textContent = 'Value';
      node.append(term, description);
    });

    expect(shadowQuery(el, 'dl.slotted slot')).toBeTruthy();
    expect(el.querySelector('dt')?.textContent).toBe('Custom');
  });
});
