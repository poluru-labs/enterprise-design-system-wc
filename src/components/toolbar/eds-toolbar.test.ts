import { describe, it, expect, beforeEach } from 'vitest';
import './eds-toolbar.js';
import type { EdsToolbar } from './eds-toolbar.js';
import { mount, resetDom, shadowQuery } from '../../test/helpers.js';

describe('eds-toolbar', () => {
  beforeEach(() => {
    resetDom();
  });

  it('renders a toolbar landmark with three regions', async () => {
    const el = await mount<EdsToolbar>('eds-toolbar');

    expect(shadowQuery(el, '[role="toolbar"]')).toBeTruthy();
    expect(shadowQuery(el, '.section.start')).toBeTruthy();
    expect(shadowQuery(el, '.section.center')).toBeTruthy();
    expect(shadowQuery(el, '.section.end')).toBeTruthy();
  });

  it('reflects bordered and sticky attributes', async () => {
    const el = await mount<EdsToolbar>('eds-toolbar', (node) => {
      node.bordered = true;
      node.sticky = true;
    });

    expect(el.hasAttribute('bordered')).toBe(true);
    expect(el.hasAttribute('sticky')).toBe(true);
  });

  it('projects slotted content into named regions', async () => {
    const el = await mount<EdsToolbar>('eds-toolbar', (node) => {
      const start = document.createElement('span');
      start.slot = 'start';
      start.textContent = 'Start';
      const end = document.createElement('span');
      end.slot = 'end';
      end.textContent = 'End';
      node.append(start, end);
    });

    expect(el.querySelector('[slot="start"]')?.textContent).toBe('Start');
    expect(el.querySelector('[slot="end"]')?.textContent).toBe('End');
  });
});
