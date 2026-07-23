import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './eds-circular-progress';
import { attr, withSnippet } from '../../storybook/snippet.js';

interface CircularProgressArgs {
  value: number;
  max: number;
  size: number;
  strokeWidth: number;
  showValue: boolean;
  indeterminate: boolean;
}

const meta: Meta<CircularProgressArgs> = {
  title: 'Components/Circular Progress',
  component: 'eds-circular-progress',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'SVG circular progress indicator with determinate and indeterminate modes.',
      },
    },
    controls: { expanded: true },
    ...withSnippet(
      (args) =>
        `<eds-circular-progress${attr('value', args.value)}${attr('max', args.max)}${attr('size', args.size)}${attr('stroke-width', args.strokeWidth)}${attr('show-value', args.showValue)}${attr('indeterminate', args.indeterminate)}></eds-circular-progress>`,
    ),
  },
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100, step: 1 }, table: { category: 'State' } },
    max: { control: 'number', table: { category: 'State', defaultValue: { summary: '100' } } },
    size: { control: { type: 'number', min: 24, max: 128, step: 4 }, table: { category: 'Appearance', defaultValue: { summary: '48' } } },
    strokeWidth: { name: 'stroke-width', control: { type: 'number', min: 2, max: 12, step: 1 }, table: { category: 'Appearance', defaultValue: { summary: '4' } } },
    showValue: { name: 'show-value', control: 'boolean', table: { category: 'Appearance', defaultValue: { summary: 'false' } } },
    indeterminate: { control: 'boolean', table: { category: 'State', defaultValue: { summary: 'false' } } },
  },
  args: {
    value: 65,
    max: 100,
    size: 48,
    strokeWidth: 4,
    showValue: true,
    indeterminate: false,
  },
  render: (args) => html`
    <eds-circular-progress
      .value=${args.value}
      .max=${args.max}
      .size=${args.size}
      .strokeWidth=${args.strokeWidth}
      ?show-value=${args.showValue}
      ?indeterminate=${args.indeterminate}
    ></eds-circular-progress>
  `,
};

export default meta;
type Story = StoryObj<CircularProgressArgs>;

export const Default: Story = {};

export const Indeterminate: Story = {
  args: {
    indeterminate: true,
    showValue: false,
  },
};

export const WithoutValue: Story = {
  args: {
    showValue: false,
    value: 40,
  },
};

export const Large: Story = {
  args: {
    size: 72,
    strokeWidth: 6,
    value: 82,
  },
};

export const Complete: Story = {
  args: {
    value: 100,
    showValue: true,
  },
};
