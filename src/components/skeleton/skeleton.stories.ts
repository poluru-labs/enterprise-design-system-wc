import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './eds-skeleton';
import { attr, withSnippet } from '../../storybook/snippet.js';

interface SkeletonArgs {
  variant: 'text' | 'circular' | 'rectangular';
  width: string;
  height: string;
  lines: number;
}

const meta: Meta<SkeletonArgs> = {
  title: 'Components/Skeleton',
  component: 'eds-skeleton',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Shimmer placeholder for loading text, avatars, and media blocks.',
      },
    },
    controls: { expanded: true },
    ...withSnippet(
      (args) =>
        `<eds-skeleton${attr('variant', args.variant)}${attr('width', args.width)}${attr('height', args.height)}${attr('lines', args.lines)}></eds-skeleton>`,
    ),
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['text', 'circular', 'rectangular'],
      table: { category: 'Appearance', defaultValue: { summary: 'text' } },
    },
    width: { control: 'text', table: { category: 'Layout' } },
    height: { control: 'text', table: { category: 'Layout' } },
    lines: { control: { type: 'number', min: 1, max: 6, step: 1 }, table: { category: 'Layout', defaultValue: { summary: '1' } } },
  },
  args: {
    variant: 'text',
    width: '',
    height: '',
    lines: 1,
  },
  render: (args) => html`
    <eds-skeleton
      variant=${args.variant}
      width=${args.width}
      height=${args.height}
      .lines=${args.lines}
    ></eds-skeleton>
  `,
};

export default meta;
type Story = StoryObj<SkeletonArgs>;

export const Default: Story = {};

export const TextLines: Story = {
  args: {
    variant: 'text',
    lines: 3,
  },
};

export const Circular: Story = {
  args: {
    variant: 'circular',
    width: '3rem',
    height: '3rem',
  },
};

export const Rectangular: Story = {
  args: {
    variant: 'rectangular',
    height: '10rem',
  },
};

export const ProfilePreview: Story = {
  parameters: {
    controls: { disable: true },
    ...withSnippet(`<eds-skeleton variant="circular" width="3rem" height="3rem"></eds-skeleton>
<eds-skeleton variant="text" width="60%"></eds-skeleton>
<eds-skeleton variant="text" lines="2"></eds-skeleton>`),
  },
  render: () => html`
    <div style="display:flex;gap:16px;align-items:flex-start;max-width:320px;">
      <eds-skeleton variant="circular" width="3rem" height="3rem"></eds-skeleton>
      <div style="flex:1;display:flex;flex-direction:column;gap:8px;">
        <eds-skeleton variant="text" width="60%"></eds-skeleton>
        <eds-skeleton variant="text" .lines=${2}></eds-skeleton>
      </div>
    </div>
  `,
};
