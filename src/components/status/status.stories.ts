import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './eds-status';
import { attr, withSnippet } from '../../storybook/snippet.js';

interface StatusArgs {
  label: string;
  variant: 'success' | 'warning' | 'danger' | 'info' | 'neutral';
  pulse: boolean;
}

const meta: Meta<StatusArgs> = {
  title: 'Components/Status',
  component: 'eds-status',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Compact status indicator with a colored dot and label.',
      },
      source: { type: 'code' },
    },
    controls: { expanded: true },
    ...withSnippet(
      (args) =>
        `<eds-status${attr('label', args.label)}${attr('variant', args.variant)}${attr('pulse', args.pulse)}></eds-status>`,
    ),
  },
  argTypes: {
    label: { control: 'text', table: { category: 'Content' } },
    variant: {
      control: 'select',
      options: ['success', 'warning', 'danger', 'info', 'neutral'],
      table: { category: 'Appearance', defaultValue: { summary: 'neutral' } },
    },
    pulse: { control: 'boolean', table: { category: 'Appearance', defaultValue: { summary: 'false' } } },
  },
  args: {
    label: 'Operational',
    variant: 'success',
    pulse: false,
  },
  render: (args) => html`
    <eds-status label=${args.label} variant=${args.variant} ?pulse=${args.pulse}></eds-status>
  `,
};

export default meta;
type Story = StoryObj<StatusArgs>;

export const Default: Story = {};

export const Variants: Story = {
  parameters: {
    controls: { disable: true },
    ...withSnippet(`<div style="display:flex;flex-direction:column;gap:12px;align-items:flex-start;">
  <eds-status label="Operational" variant="success"></eds-status>
  <eds-status label="Degraded" variant="warning"></eds-status>
  <eds-status label="Outage" variant="danger"></eds-status>
  <eds-status label="Maintenance" variant="info"></eds-status>
  <eds-status label="Unknown" variant="neutral"></eds-status>
</div>`),
  },
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:12px;align-items:flex-start;">
      <eds-status label="Operational" variant="success"></eds-status>
      <eds-status label="Degraded" variant="warning"></eds-status>
      <eds-status label="Outage" variant="danger"></eds-status>
      <eds-status label="Maintenance" variant="info"></eds-status>
      <eds-status label="Unknown" variant="neutral"></eds-status>
    </div>
  `,
};

export const Pulse: Story = {
  args: {
    label: 'Live',
    variant: 'success',
    pulse: true,
  },
};
