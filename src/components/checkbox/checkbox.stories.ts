import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './eds-checkbox';
import { attr, withSnippet } from '../../storybook/snippet.js';

interface CheckboxArgs {
  label: string;
  checked: boolean;
  indeterminate: boolean;
  disabled: boolean;
  name: string;
  value: string;
}

const meta: Meta<CheckboxArgs> = {
  title: 'Components/Checkbox',
  component: 'eds-checkbox',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: { component: 'Accessible checkbox with native input semantics and custom styling.' },
      source: { type: 'code' },
    },
    controls: { expanded: true },
    ...withSnippet(
      (args) => `<eds-checkbox${attr('label', args.label)}${attr('name', args.name)}${attr('value', args.value)}${attr('checked', args.checked)}${attr('indeterminate', args.indeterminate)}${attr('disabled', args.disabled)}></eds-checkbox>`,
    ),
  },
  argTypes: {
    label: { control: 'text', table: { category: 'Content' } },
    name: { control: 'text', table: { category: 'Content' } },
    value: { control: 'text', table: { category: 'Content' } },
    checked: { control: 'boolean', table: { category: 'State', defaultValue: { summary: 'false' } } },
    indeterminate: { control: 'boolean', table: { category: 'State', defaultValue: { summary: 'false' } } },
    disabled: { control: 'boolean', table: { category: 'State', defaultValue: { summary: 'false' } } },
  },
  args: {
    label: 'Accept terms and conditions',
    checked: false,
    indeterminate: false,
    disabled: false,
    name: 'terms',
    value: 'accepted',
  },
  render: (args) => html`
    <eds-checkbox
      label=${args.label}
      name=${args.name}
      value=${args.value}
      ?checked=${args.checked}
      ?indeterminate=${args.indeterminate}
      ?disabled=${args.disabled}
    ></eds-checkbox>
  `,
};

export default meta;
type Story = StoryObj<CheckboxArgs>;

export const Default: Story = {};

export const Checked: Story = {
  args: { checked: true },
};

export const Indeterminate: Story = {
  args: { indeterminate: true, label: 'Select all items' },
};

export const Disabled: Story = {
  args: { disabled: true },
};
