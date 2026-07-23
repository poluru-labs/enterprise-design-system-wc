import { describe, it, expect, beforeEach } from 'vitest';
import './eds-empty-state.js';
import type { EdsEmptyState } from './eds-empty-state.js';
import { mount, resetDom, shadowQuery } from '../../test/helpers.js';

describe('eds-empty-state', () => {
  beforeEach(() => {
    resetDom();
  });

  it('renders heading and description text', async () => {
    const el = await mount<EdsEmptyState>('eds-empty-state', (node) => {
      node.heading = 'No results';
      node.description = 'Try adjusting your filters.';
    });

    expect(shadowQuery(el, '.heading').textContent).toBe('No results');
    expect(shadowQuery(el, '.description').textContent).toBe('Try adjusting your filters.');
  });

  it('renders the default folder icon', async () => {
    const el = await mount<EdsEmptyState>('eds-empty-state');

    expect(el.icon).toBe('folder');
    expect(shadowQuery(el, '.icon eds-icon')).toBeTruthy();
  });

  it('hides the icon when icon is cleared', async () => {
    const el = await mount<EdsEmptyState>('eds-empty-state', (node) => {
      node.icon = '';
    });

    expect(el.shadowRoot?.querySelector('.icon')).toBeNull();
  });
});
