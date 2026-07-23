import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import type { EdsTimelineItem } from './eds-timeline';
import './eds-timeline';
import { withSnippet } from '../../storybook/snippet.js';

const sampleItems: EdsTimelineItem[] = [
  {
    title: 'Order placed',
    description: 'Your order #4821 has been received.',
    timestamp: '9:00 AM',
    status: 'complete',
  },
  {
    title: 'Processing',
    description: 'Warehouse is preparing your items.',
    timestamp: '10:15 AM',
    status: 'current',
  },
  {
    title: 'Shipped',
    description: 'Tracking number will be sent by email.',
    timestamp: 'Expected 2:00 PM',
    status: 'upcoming',
  },
  {
    title: 'Delivered',
    timestamp: 'Expected tomorrow',
    status: 'upcoming',
  },
];

interface TimelineArgs {
  items: EdsTimelineItem[];
}

const meta: Meta<TimelineArgs> = {
  title: 'Components/Timeline',
  component: 'eds-timeline',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Vertical timeline with status dots and connectors for activity feeds and process history.',
      },
      source: { type: 'code' },
    },
    controls: { expanded: true },
    ...withSnippet(
      (args) =>
        `<eds-timeline .items=${JSON.stringify(args.items)} style="max-width:28rem;"></eds-timeline>`,
    ),
  },
  argTypes: {
    items: { control: 'object', table: { category: 'Content' } },
  },
  args: {
    items: sampleItems,
  },
  render: (args) => html`
    <eds-timeline style="max-width:28rem;" .items=${args.items}></eds-timeline>
  `,
};

export default meta;
type Story = StoryObj<TimelineArgs>;

export const Default: Story = {};

export const Minimal: Story = {
  args: {
    items: [
      { title: 'Draft created', status: 'complete' },
      { title: 'Under review', status: 'current' },
      { title: 'Published', status: 'upcoming' },
    ],
  },
};
