import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './eds-time-picker';
import { attr, withSnippet } from '../../storybook/snippet.js';

interface TimePickerArgs {
  label: string;
  value: string;
  disabled: boolean;
  invalid: boolean;
  errorMessage: string;
  hint: string;
}

const meta: Meta<TimePickerArgs> = {
  title: 'Components/Time Picker',
  component: 'eds-time-picker',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Styled native time input for 24-hour HH:MM selection.',
      },
      source: { type: 'code' },
    },
    controls: { expanded: true },
    ...withSnippet(
      (args) =>
        `<eds-time-picker${attr('label', args.label)}${attr('value', args.value)}${attr('hint', args.hint)}${attr('error-message', args.errorMessage)}${attr('disabled', args.disabled)}${attr('invalid', args.invalid)} style="width:min(100%,240px);"></eds-time-picker>`,
    ),
  },
  argTypes: {
    label: { control: 'text', table: { category: 'Content' } },
    value: { control: 'text', table: { category: 'Content' } },
    hint: { control: 'text', table: { category: 'Content' } },
    errorMessage: { name: 'error-message', control: 'text', table: { category: 'Content' } },
    disabled: { control: 'boolean', table: { category: 'State', defaultValue: { summary: 'false' } } },
    invalid: { control: 'boolean', table: { category: 'State', defaultValue: { summary: 'false' } } },
  },
  args: {
    label: 'Start time',
    value: '09:30',
    disabled: false,
    invalid: false,
    errorMessage: '',
    hint: 'Uses your local timezone.',
  },
  render: (args) => html`
    <eds-time-picker
      style="width:min(100%,240px);"
      label=${args.label}
      value=${args.value}
      hint=${args.hint}
      error-message=${args.errorMessage}
      ?disabled=${args.disabled}
      ?invalid=${args.invalid}
    ></eds-time-picker>
  `,
};

export default meta;
type Story = StoryObj<TimePickerArgs>;

export const Default: Story = {};

export const Invalid: Story = {
  args: {
    invalid: true,
    errorMessage: 'Select a time within business hours.',
    hint: '',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    value: '14:00',
  },
};
