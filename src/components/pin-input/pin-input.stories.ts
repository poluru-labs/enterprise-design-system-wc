import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './eds-pin-input';
import { attr, withSnippet } from '../../storybook/snippet.js';

interface PinInputArgs {
  length: number;
  value: string;
  disabled: boolean;
  type: 'text' | 'number' | 'password';
  label: string;
  invalid: boolean;
  errorMessage: string;
}

const meta: Meta<PinInputArgs> = {
  title: 'Components/PinInput',
  component: 'eds-pin-input',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'OTP-style segmented input. Emits `eds-change` on each update and `eds-complete` when all cells are filled.',
      },
      source: { type: 'code' },
    },
    controls: { expanded: true },
    ...withSnippet(
      (args) =>
        `<eds-pin-input${attr('length', args.length)}${attr('value', args.value)}${attr('type', args.type)}${attr('label', args.label)}${attr('error-message', args.errorMessage)}${attr('disabled', args.disabled)}${attr('invalid', args.invalid)}></eds-pin-input>`,
    ),
  },
  argTypes: {
    length: { control: { type: 'number', min: 4, max: 8, step: 1 }, table: { category: 'Content', defaultValue: { summary: '6' } } },
    value: { control: 'text', table: { category: 'Content' } },
    type: {
      control: 'inline-radio',
      options: ['text', 'number', 'password'],
      table: { category: 'Content', defaultValue: { summary: 'text' } },
    },
    label: { control: 'text', table: { category: 'Content' } },
    errorMessage: { name: 'error-message', control: 'text', table: { category: 'Content' } },
    disabled: { control: 'boolean', table: { category: 'State', defaultValue: { summary: 'false' } } },
    invalid: { control: 'boolean', table: { category: 'State', defaultValue: { summary: 'false' } } },
  },
  args: {
    length: 6,
    value: '',
    disabled: false,
    type: 'number',
    label: 'Verification code',
    invalid: false,
    errorMessage: '',
  },
  render: (args) => html`
    <eds-pin-input
      .length=${args.length}
      value=${args.value}
      type=${args.type}
      label=${args.label}
      error-message=${args.errorMessage}
      ?disabled=${args.disabled}
      ?invalid=${args.invalid}
      @eds-change=${(e: CustomEvent<{ value: string }>) => {
        const target = e.currentTarget as HTMLElement & { value: string };
        target.value = e.detail.value;
      }}
    ></eds-pin-input>
  `,
};

export default meta;
type Story = StoryObj<PinInputArgs>;

export const Default: Story = {};

export const Password: Story = {
  args: {
    type: 'password',
    label: 'Enter PIN',
  },
};

export const Invalid: Story = {
  args: {
    value: '123456',
    invalid: true,
    errorMessage: 'Invalid verification code.',
  },
};

export const Disabled: Story = {
  args: {
    value: '123',
    disabled: true,
  },
};
