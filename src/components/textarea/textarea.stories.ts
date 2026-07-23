import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './eds-textarea';
import { attr, withSnippet } from '../../storybook/snippet.js';

interface TextareaArgs {
  label: string;
  value: string;
  placeholder: string;
  rows: number;
  disabled: boolean;
  readonly: boolean;
  required: boolean;
  invalid: boolean;
  errorMessage: string;
  hint: string;
  resize: 'none' | 'vertical' | 'both';
  maxlength: number;
}

const meta: Meta<TextareaArgs> = {
  title: 'Components/Textarea',
  component: 'eds-textarea',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Multi-line text input with label, hint, and validation states.',
      },
      source: { type: 'code' },
    },
    controls: { expanded: true },
    ...withSnippet(
      (args) =>
        `<eds-textarea${attr('label', args.label)}${attr('value', args.value)}${attr('placeholder', args.placeholder)}${attr('rows', args.rows)}${attr('hint', args.hint)}${attr('error-message', args.errorMessage)}${attr('resize', args.resize)}${attr('maxlength', args.maxlength || undefined)}${attr('disabled', args.disabled)}${attr('readonly', args.readonly)}${attr('required', args.required)}${attr('invalid', args.invalid)} style="width:min(100%,360px);"></eds-textarea>`,
    ),
  },
  argTypes: {
    label: { control: 'text', table: { category: 'Content' } },
    value: { control: 'text', table: { category: 'Content' } },
    placeholder: { control: 'text', table: { category: 'Content' } },
    rows: { control: { type: 'number', min: 2, max: 20 }, table: { category: 'Content', defaultValue: { summary: '4' } } },
    hint: { control: 'text', table: { category: 'Content' } },
    errorMessage: { name: 'error-message', control: 'text', table: { category: 'Content' } },
    resize: {
      control: 'inline-radio',
      options: ['none', 'vertical', 'both'],
      table: { category: 'Appearance', defaultValue: { summary: 'vertical' } },
    },
    maxlength: { control: { type: 'number', min: 0 }, table: { category: 'Behavior', defaultValue: { summary: '0' } } },
    disabled: { control: 'boolean', table: { category: 'State', defaultValue: { summary: 'false' } } },
    readonly: { control: 'boolean', table: { category: 'State', defaultValue: { summary: 'false' } } },
    required: { control: 'boolean', table: { category: 'State', defaultValue: { summary: 'false' } } },
    invalid: { control: 'boolean', table: { category: 'State', defaultValue: { summary: 'false' } } },
  },
  args: {
    label: 'Description',
    value: '',
    placeholder: 'Describe your project…',
    rows: 4,
    disabled: false,
    readonly: false,
    required: false,
    invalid: false,
    errorMessage: '',
    hint: 'Share context for reviewers.',
    resize: 'vertical',
    maxlength: 0,
  },
  render: (args) => html`
    <eds-textarea
      style="width:min(100%,360px);"
      label=${args.label}
      value=${args.value}
      placeholder=${args.placeholder}
      rows=${args.rows}
      hint=${args.hint}
      error-message=${args.errorMessage}
      resize=${args.resize}
      maxlength=${args.maxlength}
      ?disabled=${args.disabled}
      ?readonly=${args.readonly}
      ?required=${args.required}
      ?invalid=${args.invalid}
    ></eds-textarea>
  `,
};

export default meta;
type Story = StoryObj<TextareaArgs>;

export const Default: Story = {};

export const Invalid: Story = {
  args: {
    invalid: true,
    errorMessage: 'Description is required.',
    hint: '',
  },
};

export const WithMaxLength: Story = {
  args: {
    maxlength: 120,
    hint: 'Maximum 120 characters.',
    placeholder: 'Keep it concise…',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    value: 'This content cannot be edited.',
  },
};
