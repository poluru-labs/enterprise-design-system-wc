import { describe, it, expect, beforeEach } from 'vitest';
import './eds-timeline.js';
import type { EdsTimeline } from './eds-timeline.js';
import { mount, resetDom, shadowQuery, shadowQueryAll } from '../../test/helpers.js';

describe('eds-timeline', () => {
  beforeEach(() => {
    resetDom();
  });

  it('renders a timeline item for each entry', async () => {
    const el = await mount<EdsTimeline>('eds-timeline', (node) => {
      node.items = [
        { title: 'Created', timestamp: '9:00 AM' },
        { title: 'Shipped', timestamp: '2:00 PM' },
      ];
    });

    expect(shadowQuery(el, 'ol.timeline')).toBeTruthy();
    expect(shadowQueryAll(el, 'li.item')).toHaveLength(2);
  });

  it('defaults the first item to current when status is omitted', async () => {
    const el = await mount<EdsTimeline>('eds-timeline', (node) => {
      node.items = [{ title: 'Created' }, { title: 'Shipped' }];
    });

    const items = shadowQueryAll(el, 'li.item');
    expect(items[0].getAttribute('data-status')).toBe('current');
    expect(items[1].getAttribute('data-status')).toBe('upcoming');
  });

  it('renders title, timestamp, and description content', async () => {
    const el = await mount<EdsTimeline>('eds-timeline', (node) => {
      node.items = [
        {
          title: 'Reviewed',
          timestamp: 'Yesterday',
          description: 'Approved by manager',
          status: 'complete',
        },
      ];
    });

    expect(shadowQuery(el, '.title').textContent).toBe('Reviewed');
    expect(shadowQuery(el, '.timestamp').textContent).toBe('Yesterday');
    expect(shadowQuery(el, '.description').textContent).toBe('Approved by manager');
  });
});
