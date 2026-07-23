import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './eds-combobox';
import { attr, withSnippet } from '../../storybook/snippet.js';

const options = [
  { label: 'Acme Corp', value: 'acme' },
  { label: 'Globex', value: 'globex' },
  { label: 'Initech', value: 'initech' },
  { label: 'Umbrella', value: 'umbrella' },
  { label: 'Wayne Enterprises', value: 'wayne' },
];

interface ComboboxArgs {
  label: string;
  value: string;
  placeholder: string;
  disabled: boolean;
  invalid: boolean;
  errorMessage: string;
}

const meta: Meta<ComboboxArgs> = {
  title: 'Components/Combobox',
  component: 'eds-combobox',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Filterable select with keyboard navigation (Arrow keys, Enter, Escape).',
      },
      source: { type: 'code' },
    },
    controls: { expanded: true },
    ...withSnippet(
      (args) => `<eds-combobox${attr('label', args.label)}${attr('value', args.value)}${attr('placeholder', args.placeholder)}${attr('error-message', args.errorMessage)}${attr('disabled', args.disabled)}${attr('invalid', args.invalid)}></eds-combobox>
<!-- Set options in JavaScript: element.options = [{ label: 'Acme Corp', value: 'acme' }, { label: 'Globex', value: 'globex' }, ...] -->`,
    ),
  },
  argTypes: {
    label: { control: 'text', table: { category: 'Content' } },
    value: { control: 'text', table: { category: 'Content' } },
    placeholder: { control: 'text', table: { category: 'Content' } },
    errorMessage: { name: 'error-message', control: 'text', table: { category: 'Content' } },
    disabled: { control: 'boolean', table: { category: 'State', defaultValue: { summary: 'false' } } },
    invalid: { control: 'boolean', table: { category: 'State', defaultValue: { summary: 'false' } } },
  },
  args: {
    label: 'Company',
    value: '',
    placeholder: 'Search companies…',
    disabled: false,
    invalid: false,
    errorMessage: '',
  },
  render: (args) => html`
    <eds-combobox
      label=${args.label}
      value=${args.value}
      placeholder=${args.placeholder}
      error-message=${args.errorMessage}
      .options=${options}
      ?disabled=${args.disabled}
      ?invalid=${args.invalid}
    ></eds-combobox>
  `,
};

export default meta;
type Story = StoryObj<ComboboxArgs>;

export const Default: Story = {};

export const WithValue: Story = {
  args: { value: 'globex' },
};

export const Invalid: Story = {
  args: { invalid: true, errorMessage: 'Select a valid company.' },
};

export const Disabled: Story = {
  args: { disabled: true, value: 'acme' },
};
