import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './eds-tag';
import '../icon/eds-icon';
import { iconArgType, type IconControlValue } from '../../storybook/icon-controls.js';
import { attr, withSnippet } from '../../storybook/snippet.js';

interface TagArgs {
  label: string;
  variant: 'neutral' | 'brand' | 'success' | 'warning' | 'danger' | 'info';
  dismissible: boolean;
  icon: IconControlValue;
}

const meta: Meta<TagArgs> = {
  title: 'Components/Tag',
  component: 'eds-tag',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Removable inline tag for filters and selections. Use the **icon** Control for an optional leading glyph.',
      },
      source: { type: 'code' },
    },
    controls: { expanded: true },
    ...withSnippet(
      (args) =>
        `<eds-tag${attr('label', args.label)}${attr('variant', args.variant)}${attr('icon', args.icon)}${attr('dismissible', args.dismissible)}></eds-tag>`,
    ),
  },
  argTypes: {
    label: { control: 'text', table: { category: 'Content' } },
    variant: {
      control: 'select',
      options: ['neutral', 'brand', 'success', 'warning', 'danger', 'info'],
      table: { category: 'Appearance', defaultValue: { summary: 'neutral' } },
    },
    dismissible: { control: 'boolean', table: { category: 'Behavior', defaultValue: { summary: 'false' } } },
    icon: iconArgType('Optional leading icon'),
  },
  args: {
    label: 'Design system',
    variant: 'brand',
    dismissible: true,
    icon: 'user',
  },
  render: (args) => html`
    <eds-tag
      label=${args.label}
      variant=${args.variant}
      icon=${args.icon}
      ?dismissible=${args.dismissible}
    ></eds-tag>
  `,
};

export default meta;
type Story = StoryObj<TagArgs>;

export const Default: Story = {};

export const WithIcon: Story = {
  args: {
    label: 'Approved',
    variant: 'success',
    icon: 'check-circle',
    dismissible: false,
  },
};

export const Variants: Story = {
  parameters: {
    controls: { disable: true },
    ...withSnippet(`<div style="display:flex;flex-wrap:wrap;gap:8px;align-items:center;">
  <eds-tag label="Neutral" variant="neutral" dismissible></eds-tag>
  <eds-tag label="Brand" variant="brand" dismissible></eds-tag>
  <eds-tag label="Success" variant="success" dismissible></eds-tag>
  <eds-tag label="Warning" variant="warning" dismissible></eds-tag>
  <eds-tag label="Danger" variant="danger" dismissible></eds-tag>
  <eds-tag label="Info" variant="info" dismissible></eds-tag>
</div>`),
  },
  render: () => html`
    <div style="display:flex;flex-wrap:wrap;gap:8px;align-items:center;">
      <eds-tag label="Neutral" variant="neutral" dismissible></eds-tag>
      <eds-tag label="Brand" variant="brand" dismissible></eds-tag>
      <eds-tag label="Success" variant="success" dismissible></eds-tag>
      <eds-tag label="Warning" variant="warning" dismissible></eds-tag>
      <eds-tag label="Danger" variant="danger" dismissible></eds-tag>
      <eds-tag label="Info" variant="info" dismissible></eds-tag>
    </div>
  `,
};

export const Dismissible: Story = {
  args: {
    label: 'Remove me',
    variant: 'neutral',
    dismissible: true,
    icon: '',
  },
};
