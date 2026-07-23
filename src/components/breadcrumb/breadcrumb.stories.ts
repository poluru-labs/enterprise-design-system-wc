import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import type { EdsBreadcrumbItemData } from './eds-breadcrumb';
import './eds-breadcrumb';
import { withSnippet } from '../../storybook/snippet.js';

const sampleItems: EdsBreadcrumbItemData[] = [
  { label: 'Home', href: '#' },
  { label: 'Projects', href: '#' },
  { label: 'Design System', href: '#' },
  { label: 'Data Display' },
];

interface BreadcrumbArgs {
  items: EdsBreadcrumbItemData[];
}

const meta: Meta<BreadcrumbArgs> = {
  title: 'Components/Breadcrumb',
  component: 'eds-breadcrumb',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Navigation trail for hierarchical pages. Pass an `items` array or slot `eds-breadcrumb-item` children.',
      },
    },
    controls: { expanded: true },
    ...withSnippet(
      (args) => {
        const items = (args.items as EdsBreadcrumbItemData[]) ?? [];
        if (!items.length) return '<eds-breadcrumb></eds-breadcrumb>';
        const lines = items.map((item, index) => {
          const isLast = index === items.length - 1;
          if (isLast) return `  <eds-breadcrumb-item label="${item.label}" current></eds-breadcrumb-item>`;
          return `  <eds-breadcrumb-item label="${item.label}" href="${item.href ?? '#'}"></eds-breadcrumb-item>`;
        });
        return `<eds-breadcrumb>\n${lines.join('\n')}\n</eds-breadcrumb>`;
      },
    ),
  },
  argTypes: {
    items: { control: 'object', table: { category: 'Content' } },
  },
  args: {
    items: sampleItems,
  },
  render: (args) => html`
    <eds-breadcrumb .items=${args.items}></eds-breadcrumb>
  `,
};

export default meta;
type Story = StoryObj<BreadcrumbArgs>;

export const Default: Story = {};

export const ShortTrail: Story = {
  args: {
    items: [
      { label: 'Home', href: '#' },
      { label: 'Settings' },
    ],
  },
};

export const SlottedItems: Story = {
  parameters: {
    controls: { disable: true },
    ...withSnippet(`<eds-breadcrumb>
  <eds-breadcrumb-item label="Home" href="#"></eds-breadcrumb-item>
  <eds-breadcrumb-item label="Library" href="#"></eds-breadcrumb-item>
  <eds-breadcrumb-item label="Components" current></eds-breadcrumb-item>
</eds-breadcrumb>`),
  },
  render: () => html`
    <eds-breadcrumb>
      <eds-breadcrumb-item label="Home" href="#" separator></eds-breadcrumb-item>
      <eds-breadcrumb-item label="Library" href="#" separator></eds-breadcrumb-item>
      <eds-breadcrumb-item label="Components" current></eds-breadcrumb-item>
    </eds-breadcrumb>
  `,
};

export const Empty: Story = {
  args: { items: [] },
};
