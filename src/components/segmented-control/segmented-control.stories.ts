import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import type { EdsSegmentedControlOption } from './eds-segmented-control';
import './eds-segmented-control';
import { attr, withSnippet } from '../../storybook/snippet.js';

const sampleOptions: EdsSegmentedControlOption[] = [
  { label: 'Day', value: 'day' },
  { label: 'Week', value: 'week' },
  { label: 'Month', value: 'month' },
];

interface SegmentedControlArgs {
  options: EdsSegmentedControlOption[];
  value: string;
  size: 'sm' | 'md';
  fullWidth: boolean;
}

const meta: Meta<SegmentedControlArgs> = {
  title: 'Components/Segmented Control',
  component: 'eds-segmented-control',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Enterprise segmented control for toggling between a small set of views or modes.',
      },
    },
    controls: { expanded: true },
    ...withSnippet(
      (args) =>
        `<eds-segmented-control${attr('value', args.value)}${attr('size', args.size)}${attr('full-width', args.fullWidth)} .options=${JSON.stringify(args.options)}></eds-segmented-control>`,
    ),
  },
  argTypes: {
    options: { control: 'object', table: { category: 'Content' } },
    value: { control: 'text', table: { category: 'Behavior' } },
    size: {
      control: 'inline-radio',
      options: ['sm', 'md'],
      table: { category: 'Appearance', defaultValue: { summary: 'md' } },
    },
    fullWidth: {
      name: 'full-width',
      control: 'boolean',
      table: { category: 'Appearance', defaultValue: { summary: 'false' } },
    },
  },
  args: {
    options: sampleOptions,
    value: 'week',
    size: 'md',
    fullWidth: false,
  },
  render: (args) => html`
    <eds-segmented-control
      style=${args.fullWidth ? 'width:min(100%,24rem);' : ''}
      .options=${args.options}
      .value=${args.value}
      size=${args.size}
      ?full-width=${args.fullWidth}
      @eds-change=${(e: CustomEvent<{ value: string }>) => {
        const target = e.currentTarget as HTMLElement & { value: string };
        target.value = e.detail.value;
      }}
    ></eds-segmented-control>
  `,
};

export default meta;
type Story = StoryObj<SegmentedControlArgs>;

export const Default: Story = {};

export const WithIcons: Story = {
  args: {
    options: [
      { label: 'List', value: 'list', icon: 'menu' },
      { label: 'Grid', value: 'grid', icon: 'filter' },
      { label: 'Chart', value: 'chart', icon: 'star' },
    ],
    value: 'list',
  },
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
  },
};

export const WithDisabled: Story = {
  args: {
    options: [
      { label: 'Active', value: 'active' },
      { label: 'Archived', value: 'archived', disabled: true },
      { label: 'Deleted', value: 'deleted' },
    ],
    value: 'active',
  },
};
