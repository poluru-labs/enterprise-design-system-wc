import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './eds-number-input';
import '../icon/eds-icon';
import { attr, withSnippet } from '../../storybook/snippet.js';

interface NumberInputArgs {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  disabled: boolean;
  invalid: boolean;
  errorMessage: string;
  hint: string;
  size: 'sm' | 'md' | 'lg';
}

const meta: Meta<NumberInputArgs> = {
  title: 'Components/Number Input',
  component: 'eds-number-input',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Numeric input with increment/decrement stepper buttons.',
      },
      source: { type: 'code' },
    },
    controls: { expanded: true },
    ...withSnippet(
      (args) =>
        `<eds-number-input${attr('label', args.label)} value="${args.value}"${attr('min', args.min)}${attr('max', args.max)}${attr('step', args.step)}${attr('hint', args.hint)}${attr('error-message', args.errorMessage)}${attr('size', args.size)}${attr('disabled', args.disabled)}${attr('invalid', args.invalid)} style="width:min(100%,240px);"></eds-number-input>`,
    ),
  },
  argTypes: {
    label: { control: 'text', table: { category: 'Content' } },
    value: { control: { type: 'number' }, table: { category: 'Content', defaultValue: { summary: '0' } } },
    min: { control: { type: 'number' }, table: { category: 'Behavior', defaultValue: { summary: 'undefined' } } },
    max: { control: { type: 'number' }, table: { category: 'Behavior', defaultValue: { summary: 'undefined' } } },
    step: { control: { type: 'number', min: 0.01 }, table: { category: 'Behavior', defaultValue: { summary: '1' } } },
    hint: { control: 'text', table: { category: 'Content' } },
    errorMessage: { name: 'error-message', control: 'text', table: { category: 'Content' } },
    size: {
      control: 'inline-radio',
      options: ['sm', 'md', 'lg'],
      table: { category: 'Appearance', defaultValue: { summary: 'md' } },
    },
    disabled: { control: 'boolean', table: { category: 'State', defaultValue: { summary: 'false' } } },
    invalid: { control: 'boolean', table: { category: 'State', defaultValue: { summary: 'false' } } },
  },
  args: {
    label: 'Quantity',
    value: 1,
    min: 0,
    max: 10,
    step: 1,
    disabled: false,
    invalid: false,
    errorMessage: '',
    hint: 'Select between 0 and 10.',
    size: 'md',
  },
  render: (args) => html`
    <eds-number-input
      style="width:min(100%,240px);"
      label=${args.label}
      .value=${args.value}
      .min=${args.min}
      .max=${args.max}
      .step=${args.step}
      hint=${args.hint}
      error-message=${args.errorMessage}
      size=${args.size}
      ?disabled=${args.disabled}
      ?invalid=${args.invalid}
    ></eds-number-input>
  `,
};

export default meta;
type Story = StoryObj<NumberInputArgs>;

export const Default: Story = {};

export const Invalid: Story = {
  args: {
    invalid: true,
    errorMessage: 'Quantity must be at least 1.',
    hint: '',
  },
};

export const Sizes: Story = {
  parameters: {
    controls: { disable: true },
    ...withSnippet(`<div style="display:flex;flex-direction:column;gap:16px;max-width:240px;">
  <eds-number-input label="Small" size="sm" value="2" min="0" max="10"></eds-number-input>
  <eds-number-input label="Medium" size="md" value="2" min="0" max="10"></eds-number-input>
  <eds-number-input label="Large" size="lg" value="2" min="0" max="10"></eds-number-input>
</div>`),
  },
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:16px;max-width:240px;">
      <eds-number-input label="Small" size="sm" .value=${2} .min=${0} .max=${10}></eds-number-input>
      <eds-number-input label="Medium" size="md" .value=${2} .min=${0} .max=${10}></eds-number-input>
      <eds-number-input label="Large" size="lg" .value=${2} .min=${0} .max=${10}></eds-number-input>
    </div>
  `,
};

export const Disabled: Story = {
  args: { disabled: true, value: 3 },
};
