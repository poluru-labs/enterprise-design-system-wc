import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './eds-badge';
import { attr, withSnippet } from '../../storybook/snippet.js';

interface BadgeArgs {
  label: string;
  variant: 'neutral' | 'brand' | 'success' | 'warning' | 'danger' | 'info';
  size: 'sm' | 'md';
  pill: boolean;
  soft: boolean;
}

const meta: Meta<BadgeArgs> = {
  title: 'Components/Badge',
  component: 'eds-badge',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Inline badge for status labels, counts, and metadata.',
      },
      source: { type: 'code' },
    },
    controls: { expanded: true },
    ...withSnippet(
      (args) =>
        `<eds-badge${attr('label', args.label)}${attr('variant', args.variant)}${attr('size', args.size)}${attr('pill', args.pill)}${attr('soft', args.soft)}></eds-badge>`,
    ),
  },
  argTypes: {
    label: { control: 'text', table: { category: 'Content' } },
    variant: {
      control: 'select',
      options: ['neutral', 'brand', 'success', 'warning', 'danger', 'info'],
      table: { category: 'Appearance', defaultValue: { summary: 'neutral' } },
    },
    size: {
      control: 'inline-radio',
      options: ['sm', 'md'],
      table: { category: 'Appearance', defaultValue: { summary: 'md' } },
    },
    pill: { control: 'boolean', table: { category: 'Appearance', defaultValue: { summary: 'false' } } },
    soft: { control: 'boolean', table: { category: 'Appearance', defaultValue: { summary: 'true' } } },
  },
  args: {
    label: 'Active',
    variant: 'brand',
    size: 'md',
    pill: false,
    soft: true,
  },
  render: (args) => html`
    <eds-badge
      label=${args.label}
      variant=${args.variant}
      size=${args.size}
      ?pill=${args.pill}
      ?soft=${args.soft}
    ></eds-badge>
  `,
};

export default meta;
type Story = StoryObj<BadgeArgs>;

export const Default: Story = {};

export const Variants: Story = {
  parameters: {
    controls: { disable: true },
    ...withSnippet(`<div style="display:flex;flex-wrap:wrap;gap:8px;align-items:center;">
  <eds-badge label="Neutral" variant="neutral"></eds-badge>
  <eds-badge label="Brand" variant="brand"></eds-badge>
  <eds-badge label="Success" variant="success"></eds-badge>
  <eds-badge label="Warning" variant="warning"></eds-badge>
  <eds-badge label="Danger" variant="danger"></eds-badge>
  <eds-badge label="Info" variant="info"></eds-badge>
</div>`),
  },
  render: () => html`
    <div style="display:flex;flex-wrap:wrap;gap:8px;align-items:center;">
      <eds-badge label="Neutral" variant="neutral"></eds-badge>
      <eds-badge label="Brand" variant="brand"></eds-badge>
      <eds-badge label="Success" variant="success"></eds-badge>
      <eds-badge label="Warning" variant="warning"></eds-badge>
      <eds-badge label="Danger" variant="danger"></eds-badge>
      <eds-badge label="Info" variant="info"></eds-badge>
    </div>
  `,
};

export const Solid: Story = {
  args: { soft: false, pill: true, variant: 'brand', label: 'Pro' },
};

export const Small: Story = {
  args: { size: 'sm', label: 'New', variant: 'success', pill: true },
};
