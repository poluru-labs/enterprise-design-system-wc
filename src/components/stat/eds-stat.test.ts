import { describe, it, expect, beforeEach } from 'vitest';
import './eds-stat.js';
import type { EdsStat } from './eds-stat.js';
import { mount, resetDom, shadowQuery } from '../../test/helpers.js';

describe('eds-stat', () => {
  beforeEach(() => {
    resetDom();
  });

  it('renders label and value', async () => {
    const el = await mount<EdsStat>('eds-stat', (node) => {
      node.label = 'Revenue';
      node.value = '$12,400';
    });

    expect(shadowQuery(el, '.label').textContent).toBe('Revenue');
    expect(shadowQuery(el, '.value').textContent).toBe('$12,400');
  });

  it('renders trend value with an icon', async () => {
    const el = await mount<EdsStat>('eds-stat', (node) => {
      node.value = 128;
      node.trend = 'up';
      node.trendValue = '+12%';
    });

    expect(shadowQuery(el, '.trend.up')).toBeTruthy();
    expect(shadowQuery(el, '.trend eds-icon')).toBeTruthy();
    expect(shadowQuery(el, '.trend span').textContent).toBe('+12%');
  });

  it('renders optional hint text', async () => {
    const el = await mount<EdsStat>('eds-stat', (node) => {
      node.value = 42;
      node.hint = 'Updated daily';
    });

    expect(shadowQuery(el, '.hint').textContent).toBe('Updated daily');
  });
});
