import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './eds-select';
import { attr, withSnippet } from '../../storybook/snippet.js';

const defaultOptions = [
  { label: 'Engineering', value: 'engineering' },
  { label: 'Design', value: 'design' },
  { label: 'Product', value: 'product' },
  { label: 'Operations', value: 'operations', disabled: true },
];

interface SelectArgs {
  label: string;
  value: string;
  placeholder: string;
  disabled: boolean;
  required: boolean;
  invalid: boolean;
  errorMessage: string;
  hint: string;
  size: 'sm' | 'md' | 'lg';
}

const meta: Meta<SelectArgs> = {
  title: 'Components/Select',
  component: 'eds-select',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: { component: 'Native select with enterprise styling and validation states.' },
      source: { type: 'code' },
    },
    controls: { expanded: true },
    ...withSnippet(
      (args) => `<eds-select${attr('label', args.label)}${attr('value', args.value)}${attr('placeholder', args.placeholder)}${attr('hint', args.hint)}${attr('error-message', args.errorMessage)}${attr('size', args.size)}${attr('disabled', args.disabled)}${attr('required', args.required)}${attr('invalid', args.invalid)}></eds-select>
<!-- Set options in JavaScript: element.options = [{ label: 'Engineering', value: 'engineering' }, ...] -->`,
    ),
  },
  argTypes: {
    label: { control: 'text', table: { category: 'Content' } },
    value: { control: 'text', table: { category: 'Content' } },
    placeholder: { control: 'text', table: { category: 'Content' } },
    hint: { control: 'text', table: { category: 'Content' } },
    errorMessage: { name: 'error-message', control: 'text', table: { category: 'Content' } },
    size: {
      control: 'inline-radio',
      options: ['sm', 'md', 'lg'],
      table: { category: 'Appearance', defaultValue: { summary: 'md' } },
    },
    disabled: { control: 'boolean', table: { category: 'State', defaultValue: { summary: 'false' } } },
    required: { control: 'boolean', table: { category: 'State', defaultValue: { summary: 'false' } } },
    invalid: { control: 'boolean', table: { category: 'State', defaultValue: { summary: 'false' } } },
  },
  args: {
    label: 'Department',
    value: '',
    placeholder: 'Choose a department',
    disabled: false,
    required: false,
    invalid: false,
    errorMessage: '',
    hint: 'Select the team you belong to.',
    size: 'md',
  },
  render: (args) => html`
    <eds-select
      label=${args.label}
      value=${args.value}
      placeholder=${args.placeholder}
      hint=${args.hint}
      error-message=${args.errorMessage}
      size=${args.size}
      .options=${defaultOptions}
      ?disabled=${args.disabled}
      ?required=${args.required}
      ?invalid=${args.invalid}
    ></eds-select>
  `,
};

export default meta;
type Story = StoryObj<SelectArgs>;

export const Default: Story = {};

export const WithValue: Story = {
  args: { value: 'design' },
};

export const Invalid: Story = {
  args: { invalid: true, errorMessage: 'Please select a department.', hint: '' },
};

export const Disabled: Story = {
  args: { disabled: true, value: 'engineering' },
};
