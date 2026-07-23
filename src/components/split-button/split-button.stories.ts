import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './eds-split-button';
import '../button/eds-button';
import '../dropdown-menu/eds-dropdown-menu';
import { iconArgType, type IconControlValue } from '../../storybook/icon-controls.js';
import { attr, withSnippet } from '../../storybook/snippet.js';

interface SplitButtonArgs {
  label: string;
  variant: 'primary' | 'secondary' | 'danger';
  size: 'sm' | 'md' | 'lg';
  disabled: boolean;
  icon: IconControlValue;
}

const menuItemsSnippet = `
  <eds-menu-item value="draft" label="Save as draft"></eds-menu-item>
  <eds-menu-item value="template" label="Save as template"></eds-menu-item>
  <eds-menu-item value="discard" label="Discard" danger></eds-menu-item>`;

const meta: Meta<SplitButtonArgs> = {
  title: 'Components/Split Button',
  component: 'eds-split-button',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Primary action button with an attached dropdown for secondary actions. Slot `eds-menu-item` children or use default items in stories.',
      },
    },
    controls: { expanded: true },
    ...withSnippet(
      (args) => `<eds-split-button${attr('label', args.label)}${attr('variant', args.variant)}${attr('size', args.size)}${attr('disabled', args.disabled)}${attr('icon', args.icon)}>${menuItemsSnippet}
</eds-split-button>`,
    ),
  },
  argTypes: {
    label: { control: 'text', table: { category: 'Content' } },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'danger'],
      table: { category: 'Appearance', defaultValue: { summary: 'primary' } },
    },
    size: {
      control: 'inline-radio',
      options: ['sm', 'md', 'lg'],
      table: { category: 'Appearance', defaultValue: { summary: 'md' } },
    },
    disabled: { control: 'boolean', table: { category: 'State', defaultValue: { summary: 'false' } } },
    icon: iconArgType('Leading icon on the primary action'),
  },
  args: {
    label: 'Save',
    variant: 'primary',
    size: 'md',
    disabled: false,
    icon: 'save',
  },
  render: (args) => html`
    <eds-split-button
      label=${args.label}
      variant=${args.variant}
      size=${args.size}
      ?disabled=${args.disabled}
      icon=${args.icon}
    >
      <eds-menu-item value="draft" label="Save as draft"></eds-menu-item>
      <eds-menu-item value="template" label="Save as template"></eds-menu-item>
      <eds-menu-item value="discard" label="Discard" danger></eds-menu-item>
    </eds-split-button>
  `,
};

export default meta;
type Story = StoryObj<SplitButtonArgs>;

export const Default: Story = {};

export const Secondary: Story = {
  args: { variant: 'secondary', label: 'Export', icon: 'download' },
};

export const Danger: Story = {
  args: { variant: 'danger', label: 'Delete', icon: 'trash' },
};

export const Small: Story = {
  args: { size: 'sm', label: 'Save', icon: '' },
};

export const Disabled: Story = {
  args: { disabled: true },
};
