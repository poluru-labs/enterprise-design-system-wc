import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './eds-meter';
import { attr, withSnippet } from '../../storybook/snippet.js';

interface MeterArgs {
  value: number;
  min: number;
  max: number;
  low: number;
  high: number;
  optimum: number;
  label: string;
  showValue: boolean;
}

const meta: Meta<MeterArgs> = {
  title: 'Components/Meter',
  component: 'eds-meter',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Scalar measurement within a known range using a styled HTML `meter` element.',
      },
    },
    controls: { expanded: true },
    ...withSnippet(
      (args) =>
        `<eds-meter${attr('value', args.value)}${attr('min', args.min)}${attr('max', args.max)}${attr('low', args.low)}${attr('high', args.high)}${attr('optimum', args.optimum)}${attr('label', args.label)}${attr('show-value', args.showValue)}></eds-meter>`,
    ),
  },
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100, step: 1 }, table: { category: 'State' } },
    min: { control: 'number', table: { category: 'State', defaultValue: { summary: '0' } } },
    max: { control: 'number', table: { category: 'State', defaultValue: { summary: '100' } } },
    low: { control: 'number', table: { category: 'State', defaultValue: { summary: '25' } } },
    high: { control: 'number', table: { category: 'State', defaultValue: { summary: '75' } } },
    optimum: { control: 'number', table: { category: 'State', defaultValue: { summary: '0' } } },
    label: { control: 'text', table: { category: 'Content' } },
    showValue: { name: 'show-value', control: 'boolean', table: { category: 'Appearance', defaultValue: { summary: 'false' } } },
  },
  args: {
    value: 62,
    min: 0,
    max: 100,
    low: 25,
    high: 75,
    optimum: 80,
    label: 'Disk usage',
    showValue: true,
  },
  render: (args) => html`
    <eds-meter
      .value=${args.value}
      .min=${args.min}
      .max=${args.max}
      .low=${args.low}
      .high=${args.high}
      .optimum=${args.optimum}
      label=${args.label}
      ?show-value=${args.showValue}
    ></eds-meter>
  `,
};

export default meta;
type Story = StoryObj<MeterArgs>;

export const Default: Story = {};

export const LowOptimum: Story = {
  args: {
    label: 'Response time (ms)',
    value: 180,
    min: 0,
    max: 500,
    low: 100,
    high: 300,
    optimum: 50,
    showValue: true,
  },
};

export const WithoutLabel: Story = {
  args: { label: '', showValue: false, value: 45 },
};
