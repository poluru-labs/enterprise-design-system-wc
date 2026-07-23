import { describe, it, expect, beforeEach } from 'vitest';
import { mount, resetDom, shadowQuery } from '../../test/helpers.js';
import './eds-icon.js';
import type { EdsIcon } from './eds-icon.js';

describe('eds-icon', () => {
  beforeEach(() => {
    resetDom();
  });

  it('renders an svg for a valid icon name', async () => {
    const el = await mount<EdsIcon>('eds-icon', (node) => {
      node.name = 'search';
      node.size = 'md';
    });

    const svg = shadowQuery<SVGElement>(el, 'svg.md');
    expect(svg.getAttribute('aria-hidden')).toBe('true');
    expect(svg.querySelector('path, circle, rect, line, polyline, polygon')).toBeTruthy();
  });

  it('applies size classes to the svg', async () => {
    const el = await mount<EdsIcon>('eds-icon', (node) => {
      node.name = 'check';
      node.size = 'lg';
    });

    expect(shadowQuery(el, 'svg.lg')).toBeTruthy();
  });

  it('exposes accessible label when decorative is false', async () => {
    const el = await mount<EdsIcon>('eds-icon', (node) => {
      node.name = 'info';
      node.decorative = false;
      node.label = 'Information';
    });

    const svg = shadowQuery<SVGElement>(el, 'svg');
    expect(svg.getAttribute('role')).toBe('img');
    expect(svg.getAttribute('aria-label')).toBe('Information');
  });

  it('renders nothing for an invalid icon name', async () => {
    const el = await mount<EdsIcon>('eds-icon', (node) => {
      node.name = 'not-a-real-icon' as EdsIcon['name'];
    });

    expect(el.shadowRoot?.querySelector('svg')).toBeNull();
  });
});
