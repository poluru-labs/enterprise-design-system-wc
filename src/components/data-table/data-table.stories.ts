import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import type { EdsDataTableColumn } from './eds-data-table';
import './eds-data-table';
import { attr, withSnippet } from '../../storybook/snippet.js';

const employeeColumns: EdsDataTableColumn[] = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'role', label: 'Role', sortable: true },
  { key: 'department', label: 'Department', sortable: true },
  { key: 'status', label: 'Status' },
];

const employeeRows = [
  { name: 'Alex Rivera', role: 'Engineering Manager', department: 'Engineering', status: 'Active' },
  { name: 'Subrahmanyam Poluru', role: 'Product Designer', department: 'Design', status: 'Active' },
  { name: 'Sam Patel', role: 'Senior Developer', department: 'Engineering', status: 'On leave' },
  { name: 'Taylor Kim', role: 'Product Manager', department: 'Product', status: 'Active' },
  { name: 'Morgan Chen', role: 'UX Researcher', department: 'Design', status: 'Active' },
];

interface DataTableArgs {
  columns: EdsDataTableColumn[];
  rows: Record<string, string | number>[];
  sortable: boolean;
  striped: boolean;
  compact: boolean;
}

const meta: Meta<DataTableArgs> = {
  title: 'Components/Data Table',
  component: 'eds-data-table',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Responsive data table with optional column sorting, striped rows, and compact density.',
      },
    },
    controls: { expanded: true },
    ...withSnippet(
      (args) => `<eds-data-table${attr('sortable', args.sortable)}${attr('striped', args.striped)}${attr('compact', args.compact)}></eds-data-table>
<!-- Set .columns and .rows via JavaScript properties -->`,
    ),
  },
  argTypes: {
    columns: { control: 'object', table: { category: 'Content' } },
    rows: { control: 'object', table: { category: 'Content' } },
    sortable: {
      control: 'boolean',
      description: 'Enables sortable column headers',
      table: { category: 'Behavior', defaultValue: { summary: 'false' } },
    },
    striped: {
      control: 'boolean',
      description: 'Alternating row backgrounds',
      table: { category: 'Appearance', defaultValue: { summary: 'false' } },
    },
    compact: {
      control: 'boolean',
      description: 'Reduces cell padding and font size',
      table: { category: 'Appearance', defaultValue: { summary: 'false' } },
    },
  },
  args: {
    columns: employeeColumns,
    rows: employeeRows,
    sortable: true,
    striped: false,
    compact: false,
  },
  render: (args) => html`
    <eds-data-table
      .columns=${args.columns}
      .rows=${args.rows}
      ?sortable=${args.sortable}
      ?striped=${args.striped}
      ?compact=${args.compact}
      @eds-sort=${(event: CustomEvent<{ key: string; direction: 'asc' | 'desc' }>) => {
        console.log('eds-sort', event.detail);
      }}
    ></eds-data-table>
  `,
};

export default meta;
type Story = StoryObj<DataTableArgs>;

export const Default: Story = {};

export const Striped: Story = {
  args: { striped: true },
};

export const Compact: Story = {
  args: { compact: true },
};

export const Empty: Story = {
  args: { rows: [] },
};
