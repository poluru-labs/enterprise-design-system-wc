import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './eds-switch';
import { attr, withSnippet } from '../../storybook/snippet.js';

interface SwitchArgs {
  label: string;
  checked: boolean;
  disabled: boolean;
  name: string;
}

const meta: Meta<SwitchArgs> = {
  title: 'Components/Switch',
  component: 'eds-switch',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: { component: 'Toggle switch for boolean on/off settings.' },
      source: { type: 'code' },
    },
    controls: { expanded: true },
    ...withSnippet(
      (args) => `<eds-switch${attr('label', args.label)}${attr('name', args.name)}${attr('checked', args.checked)}${attr('disabled', args.disabled)}></eds-switch>`,
    ),
  },
  argTypes: {
    label: { control: 'text', table: { category: 'Content' } },
    name: { control: 'text', table: { category: 'Content' } },
    checked: { control: 'boolean', table: { category: 'State', defaultValue: { summary: 'false' } } },
    disabled: { control: 'boolean', table: { category: 'State', defaultValue: { summary: 'false' } } },
  },
  args: {
    label: 'Enable notifications',
    checked: false,
    disabled: false,
    name: 'notifications',
  },
  render: (args) => html`
    <eds-switch
      label=${args.label}
      name=${args.name}
      ?checked=${args.checked}
      ?disabled=${args.disabled}
    ></eds-switch>
  `,
};

export default meta;
type Story = StoryObj<SwitchArgs>;

export const Default: Story = {};

export const Checked: Story = {
  args: { checked: true },
};

export const Disabled: Story = {
  args: { disabled: true, checked: true },
};
