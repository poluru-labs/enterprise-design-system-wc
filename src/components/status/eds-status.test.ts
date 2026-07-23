import { describe, it, expect, beforeEach } from 'vitest';
import { mount, resetDom, shadowQuery } from '../../test/helpers.js';
import './eds-status.js';
import type { EdsStatus } from './eds-status.js';

describe('eds-status', () => {
  beforeEach(() => {
    resetDom();
  });

  it('renders label with default neutral variant', async () => {
    const el = await mount<EdsStatus>('eds-status', (node) => {
      node.label = 'Offline';
    });

    expect(el.variant).toBe('neutral');
    expect(shadowQuery(el, '.label').textContent).toBe('Offline');
    expect(shadowQuery(el, '.dot.neutral')).toBeTruthy();
  });

  it('reflects variant on the status dot', async () => {
    const el = await mount<EdsStatus>('eds-status', (node) => {
      node.label = 'Healthy';
      node.variant = 'success';
    });

    expect(shadowQuery(el, '.dot.success')).toBeTruthy();
  });

  it('enables pulse animation on the dot when pulse is true', async () => {
    const el = await mount<EdsStatus>('eds-status', (node) => {
      node.label = 'Syncing';
      node.variant = 'info';
      node.pulse = true;
    });

    expect(shadowQuery(el, '.dot').getAttribute('data-pulse')).toBe('true');
    expect(shadowQuery(el, '[role="status"]')).toBeTruthy();
  });
});
