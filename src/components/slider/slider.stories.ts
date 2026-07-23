import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './eds-slider';
import { attr, withSnippet } from '../../storybook/snippet.js';

interface SliderArgs {
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  disabled: boolean;
  showValue: boolean;
}

const meta: Meta<SliderArgs> = {
  title: 'Components/Slider',
  component: 'eds-slider',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: { component: 'Range slider for selecting numeric values within a min/max range.' },
      source: { type: 'code' },
    },
    controls: { expanded: true },
    ...withSnippet(
      (args) => `<eds-slider${attr('label', args.label)}${attr('min', args.min)}${attr('max', args.max)}${attr('step', args.step)}${attr('value', args.value)}${attr('show-value', args.showValue)}${attr('disabled', args.disabled)}></eds-slider>`,
    ),
  },
  argTypes: {
    label: { control: 'text', table: { category: 'Content' } },
    min: { control: { type: 'number' }, table: { category: 'Range', defaultValue: { summary: '0' } } },
    max: { control: { type: 'number' }, table: { category: 'Range', defaultValue: { summary: '100' } } },
    step: { control: { type: 'number' }, table: { category: 'Range', defaultValue: { summary: '1' } } },
    value: { control: { type: 'number' }, table: { category: 'Content', defaultValue: { summary: '50' } } },
    showValue: {
      name: 'show-value',
      control: 'boolean',
      table: { category: 'Appearance', defaultValue: { summary: 'false' } },
    },
    disabled: { control: 'boolean', table: { category: 'State', defaultValue: { summary: 'false' } } },
  },
  args: {
    label: 'Volume',
    min: 0,
    max: 100,
    step: 1,
    value: 50,
    disabled: false,
    showValue: true,
  },
  render: (args) => html`
    <eds-slider
      label=${args.label}
      min=${args.min}
      max=${args.max}
      step=${args.step}
      value=${args.value}
      ?disabled=${args.disabled}
      ?show-value=${args.showValue}
    ></eds-slider>
  `,
};

export default meta;
type Story = StoryObj<SliderArgs>;

export const Default: Story = {};

export const CustomRange: Story = {
  args: { label: 'Price range', min: 10, max: 500, step: 10, value: 120 },
};

export const Disabled: Story = {
  args: { disabled: true, value: 30 },
};
