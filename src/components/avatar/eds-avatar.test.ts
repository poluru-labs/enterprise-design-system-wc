import { describe, it, expect, beforeEach } from 'vitest';
import './eds-avatar.js';
import type { EdsAvatar } from './eds-avatar.js';
import { mount, resetDom, shadowQuery } from '../../test/helpers.js';

describe('eds-avatar', () => {
  beforeEach(() => {
    resetDom();
  });

  it('renders initials from a multi-word name', async () => {
    const el = await mount<EdsAvatar>('eds-avatar', (node) => {
      node.name = 'Jane Doe';
    });

    expect(shadowQuery(el, 'span.avatar').textContent?.trim()).toBe('JD');
  });

  it('reflects size on the avatar element', async () => {
    const el = await mount<EdsAvatar>('eds-avatar', (node) => {
      node.size = 'lg';
    });

    expect(el.getAttribute('size')).toBe('lg');
    expect(shadowQuery(el, 'span.lg')).toBeTruthy();
  });

  it('uses alt text for the accessible label', async () => {
    const el = await mount<EdsAvatar>('eds-avatar', (node) => {
      node.alt = 'Profile photo';
    });

    expect(shadowQuery(el, '[role="img"]').getAttribute('aria-label')).toBe('Profile photo');
  });

  it('falls back to initials when image fails to load', async () => {
    const el = await mount<EdsAvatar>('eds-avatar', (node) => {
      node.name = 'Alex Smith';
      node.src = 'https://example.invalid/missing.png';
    });

    const img = shadowQuery<HTMLImageElement>(el, 'img');
    img.dispatchEvent(new Event('error'));
    await el.updateComplete;

    expect(shadowQuery(el, 'span.avatar span[aria-hidden="true"]').textContent?.trim()).toBe('AS');
  });
});
