import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './eds-stat';
import { attr, withSnippet } from '../../storybook/snippet.js';

interface StatArgs {
  value: string;
  label: string;
  hint: string;
  trend: 'up' | 'down' | 'flat' | '';
  trendValue: string;
}

const meta: Meta<StatArgs> = {
  title: 'Components/Stat',
  component: 'eds-stat',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Clean KPI / metric block for dashboards without heavy card chrome.',
      },
    },
    controls: { expanded: true },
    ...withSnippet(
      (args) =>
        `<eds-stat${attr('value', args.value)}${attr('label', args.label)}${attr('hint', args.hint)}${attr('trend', args.trend)}${attr('trend-value', args.trendValue)}></eds-stat>`,
    ),
  },
  argTypes: {
    value: { control: 'text', table: { category: 'Content' } },
    label: { control: 'text', table: { category: 'Content' } },
    hint: { control: 'text', table: { category: 'Content' } },
    trend: {
      control: 'select',
      options: ['', 'up', 'down', 'flat'],
      table: { category: 'Appearance', defaultValue: { summary: '""' } },
    },
    trendValue: { name: 'trend-value', control: 'text', table: { category: 'Content' } },
  },
  args: {
    value: '12,480',
    label: 'Total revenue',
    hint: 'Compared to last month',
    trend: 'up',
    trendValue: '8.2%',
  },
  render: (args) => html`
    <eds-stat
      value=${args.value}
      label=${args.label}
      hint=${args.hint}
      trend=${args.trend}
      trend-value=${args.trendValue}
    ></eds-stat>
  `,
};

export default meta;
type Story = StoryObj<StatArgs>;

export const Default: Story = {};

export const DownTrend: Story = {
  args: {
    label: 'Active users',
    value: '1,204',
    trend: 'down',
    trendValue: '3.1%',
    hint: 'Weekly average',
  },
};

export const FlatTrend: Story = {
  args: {
    label: 'Conversion rate',
    value: '4.6%',
    trend: 'flat',
    trendValue: '0.0%',
    hint: 'No change',
  },
};

export const Minimal: Story = {
  args: {
    label: 'Open tickets',
    value: '42',
    hint: '',
    trend: '',
    trendValue: '',
  },
};

export const StatRow: Story = {
  parameters: {
    controls: { disable: true },
    ...withSnippet(`<div style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:24px;">
  <eds-stat label="Revenue" value="$48.2k" trend="up" trend-value="12%"></eds-stat>
  <eds-stat label="Orders" value="326" trend="down" trend-value="4%"></eds-stat>
  <eds-stat label="Avg. order" value="$148" trend="flat" trend-value="0%"></eds-stat>
</div>`),
  },
  render: () => html`
    <div style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:24px;">
      <eds-stat label="Revenue" value="$48.2k" trend="up" trend-value="12%"></eds-stat>
      <eds-stat label="Orders" value="326" trend="down" trend-value="4%"></eds-stat>
      <eds-stat label="Avg. order" value="$148" trend="flat" trend-value="0%"></eds-stat>
    </div>
  `,
};
