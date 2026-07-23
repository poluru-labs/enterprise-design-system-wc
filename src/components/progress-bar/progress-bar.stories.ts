import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './eds-progress-bar';
import { attr, withSnippet } from '../../storybook/snippet.js';

interface ProgressBarArgs {
  value: number;
  max: number;
  indeterminate: boolean;
  label: string;
  showValue: boolean;
}

const meta: Meta<ProgressBarArgs> = {
  title: 'Components/Progress Bar',
  component: 'eds-progress-bar',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Accessible progress indicator with determinate and indeterminate modes.',
      },
    },
    controls: { expanded: true },
    ...withSnippet(
      (args) =>
        `<eds-progress-bar${attr('value', args.value)}${attr('max', args.max)}${attr('indeterminate', args.indeterminate)}${attr('label', args.label)}${attr('show-value', args.showValue)}></eds-progress-bar>`,
    ),
  },
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100, step: 1 }, table: { category: 'State' } },
    max: { control: 'number', table: { category: 'State', defaultValue: { summary: '100' } } },
    indeterminate: { control: 'boolean', table: { category: 'State', defaultValue: { summary: 'false' } } },
    label: { control: 'text', table: { category: 'Content' } },
    showValue: { name: 'show-value', control: 'boolean', table: { category: 'Appearance', defaultValue: { summary: 'false' } } },
  },
  args: {
    value: 45,
    max: 100,
    indeterminate: false,
    label: 'Upload progress',
    showValue: true,
  },
  render: (args) => html`
    <eds-progress-bar
      .value=${args.value}
      .max=${args.max}
      ?indeterminate=${args.indeterminate}
      label=${args.label}
      ?show-value=${args.showValue}
    ></eds-progress-bar>
  `,
};

export default meta;
type Story = StoryObj<ProgressBarArgs>;

export const Default: Story = {};

export const Indeterminate: Story = {
  args: {
    indeterminate: true,
    label: 'Loading data',
    showValue: false,
  },
};

export const WithoutLabel: Story = {
  args: {
    label: '',
    showValue: false,
    value: 72,
  },
};

export const Complete: Story = {
  args: {
    value: 100,
    label: 'Processing complete',
  },
};
