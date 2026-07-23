import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './eds-description-list';
import { attr, withSnippet } from '../../storybook/snippet.js';

interface DescriptionListArgs {
  columns: 1 | 2 | 3;
  compact: boolean;
}

const sampleItems = [
  { term: 'Customer', description: 'Acme Corporation' },
  { term: 'Plan', description: 'Enterprise' },
  { term: 'Region', description: 'US East' },
  { term: 'Owner', description: 'Jordan Lee' },
  { term: 'Created', description: 'Jan 12, 2026' },
  { term: 'Status', description: 'Active' },
];

const meta: Meta<DescriptionListArgs> = {
  title: 'Components/Description List',
  component: 'eds-description-list',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Semantic `dl` / `dt` / `dd` list. Pass an `items` array or slot custom term/description pairs.',
      },
    },
    controls: { expanded: true },
    ...withSnippet(
      (args) => `<eds-description-list${attr('columns', args.columns)}${attr('compact', args.compact)}>
  <!-- Or bind .items in JS: [{ term: 'Customer', description: 'Acme Corporation' }, ...] -->
  <dt>Customer</dt>
  <dd>Acme Corporation</dd>
  <dt>Plan</dt>
  <dd>Enterprise</dd>
  <dt>Region</dt>
  <dd>US East</dd>
</eds-description-list>`,
    ),
  },
  argTypes: {
    columns: {
      control: 'inline-radio',
      options: [1, 2, 3],
      table: { category: 'Appearance', defaultValue: { summary: '1' } },
    },
    compact: { control: 'boolean', table: { category: 'Appearance', defaultValue: { summary: 'false' } } },
  },
  args: {
    columns: 2,
    compact: false,
  },
  render: (args) => html`
    <eds-description-list
      .columns=${args.columns}
      ?compact=${args.compact}
      .items=${sampleItems}
    ></eds-description-list>
  `,
};

export default meta;
type Story = StoryObj<DescriptionListArgs>;

export const Default: Story = {};

export const SingleColumn: Story = {
  args: { columns: 1 },
};

export const ThreeColumns: Story = {
  args: { columns: 3 },
};

export const Compact: Story = {
  args: { compact: true, columns: 2 },
};

export const Slotted: Story = {
  parameters: {
    controls: { disable: true },
    ...withSnippet(`<eds-description-list columns="2">
  <dt>Invoice</dt>
  <dd>#INV-2048</dd>
  <dt>Amount</dt>
  <dd>$1,240.00</dd>
  <dt>Due date</dt>
  <dd>Jul 30, 2026</dd>
  <dt>Payment method</dt>
  <dd>Wire transfer</dd>
</eds-description-list>`),
  },
  render: () => html`
    <eds-description-list columns="2">
      <dt>Invoice</dt>
      <dd>#INV-2048</dd>
      <dt>Amount</dt>
      <dd>$1,240.00</dd>
      <dt>Due date</dt>
      <dd>Jul 30, 2026</dd>
      <dt>Payment method</dt>
      <dd>Wire transfer</dd>
    </eds-description-list>
  `,
};
