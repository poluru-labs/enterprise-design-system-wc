import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './eds-date-picker';
import { attr, withSnippet } from '../../storybook/snippet.js';

interface DatePickerArgs {
  label: string;
  value: string;
  min: string;
  max: string;
  disabled: boolean;
  placeholder: string;
  invalid: boolean;
  errorMessage: string;
  hint: string;
}

const meta: Meta<DatePickerArgs> = {
  title: 'Components/Date Picker',
  component: 'eds-date-picker',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Single-date picker with a text field and calendar popover. Stores values as ISO `YYYY-MM-DD` strings and displays locale short dates.',
      },
      source: {
        type: 'code',
      },
    },
    controls: { expanded: true },
    ...withSnippet(
      (args) => `<eds-date-picker${attr('label', args.label)}${attr('value', args.value)}${attr('min', args.min)}${attr('max', args.max)}${attr('placeholder', args.placeholder)}${attr('error-message', args.errorMessage)}${attr('hint', args.hint)}${attr('disabled', args.disabled)}${attr('invalid', args.invalid)}></eds-date-picker>`,
    ),
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Field label',
      table: { category: 'Content' },
    },
    value: {
      control: 'text',
      description: 'Selected date (YYYY-MM-DD)',
      table: { category: 'Content' },
    },
    min: {
      control: 'text',
      description: 'Earliest selectable date (YYYY-MM-DD)',
      table: { category: 'Validation' },
    },
    max: {
      control: 'text',
      description: 'Latest selectable date (YYYY-MM-DD)',
      table: { category: 'Validation' },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables interaction',
      table: { category: 'State', defaultValue: { summary: 'false' } },
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder when no date is selected',
      table: { category: 'Content', defaultValue: { summary: 'Select date' } },
    },
    invalid: {
      control: 'boolean',
      description: 'Shows invalid styling',
      table: { category: 'State', defaultValue: { summary: 'false' } },
    },
    errorMessage: {
      name: 'error-message',
      control: 'text',
      description: 'Error message shown when invalid',
      table: { category: 'Content' },
    },
    hint: {
      control: 'text',
      description: 'Helper text below the field',
      table: { category: 'Content' },
    },
  },
  args: {
    label: 'Start date',
    value: '',
    min: '',
    max: '',
    disabled: false,
    placeholder: 'Select date',
    invalid: false,
    errorMessage: '',
    hint: '',
  },
  render: (args) => html`
    <eds-date-picker
      label=${args.label}
      value=${args.value}
      min=${args.min}
      max=${args.max}
      placeholder=${args.placeholder}
      error-message=${args.errorMessage}
      hint=${args.hint}
      ?disabled=${args.disabled}
      ?invalid=${args.invalid}
    ></eds-date-picker>
  `,
};

export default meta;
type Story = StoryObj<DatePickerArgs>;

export const Default: Story = {};

export const WithValue: Story = {
  args: {
    value: '2026-07-15',
    hint: 'Choose the first day of your trip.',
  },
};

export const WithMinMax: Story = {
  args: {
    min: '2026-07-01',
    max: '2026-07-31',
    hint: 'Only July 2026 dates are selectable.',
  },
};

export const Invalid: Story = {
  args: {
    invalid: true,
    errorMessage: 'Please select a valid date.',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    value: '2026-07-15',
  },
};

export const WithHint: Story = {
  args: {
    hint: 'Dates are saved in ISO format (YYYY-MM-DD).',
  },
};
