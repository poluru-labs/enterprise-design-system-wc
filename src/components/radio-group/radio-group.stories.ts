import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './eds-radio-group';
import { attr, withSnippet } from '../../storybook/snippet.js';

interface RadioGroupArgs {
  label: string;
  name: string;
  value: string;
  disabled: boolean;
  orientation: 'horizontal' | 'vertical';
}

const meta: Meta<RadioGroupArgs> = {
  title: 'Components/Radio Group',
  component: 'eds-radio-group',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: { component: 'Radio group with `eds-radio` options and horizontal or vertical layout.' },
      source: { type: 'code' },
    },
    controls: { expanded: true },
    ...withSnippet(
      (args) => `<eds-radio-group${attr('label', args.label)}${attr('name', args.name)}${attr('value', args.value)}${attr('orientation', args.orientation)}${attr('disabled', args.disabled)}>
  <eds-radio label="Email" value="email"></eds-radio>
  <eds-radio label="SMS" value="sms"></eds-radio>
  <eds-radio label="Push" value="push"></eds-radio>
</eds-radio-group>`,
    ),
  },
  argTypes: {
    label: { control: 'text', table: { category: 'Content' } },
    name: { control: 'text', table: { category: 'Content' } },
    value: { control: 'text', table: { category: 'Content' } },
    orientation: {
      control: 'inline-radio',
      options: ['horizontal', 'vertical'],
      table: { category: 'Layout', defaultValue: { summary: 'vertical' } },
    },
    disabled: { control: 'boolean', table: { category: 'State', defaultValue: { summary: 'false' } } },
  },
  args: {
    label: 'Notification preference',
    name: 'notify',
    value: 'email',
    disabled: false,
    orientation: 'vertical',
  },
  render: (args) => html`
    <eds-radio-group
      label=${args.label}
      name=${args.name}
      value=${args.value}
      orientation=${args.orientation}
      ?disabled=${args.disabled}
    >
      <eds-radio label="Email" value="email"></eds-radio>
      <eds-radio label="SMS" value="sms"></eds-radio>
      <eds-radio label="Push" value="push"></eds-radio>
    </eds-radio-group>
  `,
};

export default meta;
type Story = StoryObj<RadioGroupArgs>;

export const Default: Story = {};

export const Horizontal: Story = {
  args: { orientation: 'horizontal', label: 'Plan tier' },
  parameters: {
    ...withSnippet(
      (args) => `<eds-radio-group${attr('label', args.label)} name="plan" value="pro"${attr('orientation', args.orientation)}${attr('disabled', args.disabled)}>
  <eds-radio label="Starter" value="starter"></eds-radio>
  <eds-radio label="Pro" value="pro"></eds-radio>
  <eds-radio label="Enterprise" value="enterprise"></eds-radio>
</eds-radio-group>`,
    ),
  },
  render: (args) => html`
    <eds-radio-group
      label=${args.label}
      name="plan"
      value="pro"
      orientation=${args.orientation}
      ?disabled=${args.disabled}
    >
      <eds-radio label="Starter" value="starter"></eds-radio>
      <eds-radio label="Pro" value="pro"></eds-radio>
      <eds-radio label="Enterprise" value="enterprise"></eds-radio>
    </eds-radio-group>
  `,
};

export const Disabled: Story = {
  args: { disabled: true },
};
