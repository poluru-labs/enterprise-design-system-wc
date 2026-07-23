import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './eds-pagination';
import { attr, withSnippet } from '../../storybook/snippet.js';

interface PaginationArgs {
  page: number;
  pageSize: number;
  total: number;
  siblingCount: number;
}

const meta: Meta<PaginationArgs> = {
  title: 'Components/Pagination',
  component: 'eds-pagination',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Pagination control with previous/next buttons, numbered pages, and ellipsis for large page counts.',
      },
    },
    controls: { expanded: true },
    ...withSnippet(
      (args) =>
        `<eds-pagination${attr('page', args.page)}${attr('page-size', args.pageSize)}${attr('total', args.total)}${attr('sibling-count', args.siblingCount)}></eds-pagination>`,
    ),
  },
  argTypes: {
    page: {
      control: { type: 'number', min: 1 },
      table: { category: 'State', defaultValue: { summary: '1' } },
    },
    pageSize: {
      name: 'page-size',
      control: { type: 'number', min: 1 },
      table: { category: 'Behavior', defaultValue: { summary: '10' } },
    },
    total: {
      control: { type: 'number', min: 0 },
      table: { category: 'Content', defaultValue: { summary: '0' } },
    },
    siblingCount: {
      name: 'sibling-count',
      control: { type: 'number', min: 0, max: 3 },
      table: { category: 'Behavior', defaultValue: { summary: '1' } },
    },
  },
  args: {
    page: 5,
    pageSize: 10,
    total: 200,
    siblingCount: 1,
  },
  render: (args) => html`
    <eds-pagination
      page=${args.page}
      page-size=${args.pageSize}
      total=${args.total}
      sibling-count=${args.siblingCount}
      @eds-change=${(event: CustomEvent<{ page: number }>) => {
        console.log('eds-change', event.detail);
      }}
    ></eds-pagination>
  `,
};

export default meta;
type Story = StoryObj<PaginationArgs>;

export const Default: Story = {};

export const FirstPage: Story = {
  args: { page: 1 },
};

export const LastPage: Story = {
  args: { page: 20, total: 200, pageSize: 10 },
};

export const FewPages: Story = {
  args: { page: 2, total: 30, pageSize: 10, siblingCount: 1 },
};

export const Empty: Story = {
  args: { page: 1, total: 0 },
};
