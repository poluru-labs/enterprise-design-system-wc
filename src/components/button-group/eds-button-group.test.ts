import { describe, it, expect, beforeEach } from 'vitest';
import '../button/eds-button.js';
import './eds-button-group.js';
import type { EdsButtonGroup } from './eds-button-group.js';
import { mount, resetDom, shadowQuery } from '../../test/helpers.js';

describe('eds-button-group', () => {
  beforeEach(() => {
    resetDom();
  });

  it('renders a grouped container for slotted buttons', async () => {
    const el = await mount<EdsButtonGroup>('eds-button-group', (node) => {
      node.innerHTML = '<eds-button>One</eds-button><eds-button>Two</eds-button>';
    });

    expect(shadowQuery(el, '[role="group"]')).toBeTruthy();
    expect(el.querySelectorAll('eds-button')).toHaveLength(2);
  });

  it('reflects vertical orientation', async () => {
    const el = await mount<EdsButtonGroup>('eds-button-group', (node) => {
      node.orientation = 'vertical';
    });

    expect(el.getAttribute('orientation')).toBe('vertical');
  });

  it('syncs size to slotted eds-button children', async () => {
    const el = await mount<EdsButtonGroup>('eds-button-group', (node) => {
      node.size = 'sm';
      node.innerHTML = '<eds-button>One</eds-button><eds-button>Two</eds-button>';
    });

    await el.updateComplete;
    el.querySelectorAll('eds-button').forEach((button) => {
      expect(button.size).toBe('sm');
    });
  });
});
