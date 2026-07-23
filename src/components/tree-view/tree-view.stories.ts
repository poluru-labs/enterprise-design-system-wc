import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import type { EdsTreeNode } from './eds-tree-view';
import './eds-tree-view';
import { attr, withSnippet } from '../../storybook/snippet.js';

const sampleItems: EdsTreeNode[] = [
  {
    id: 'engineering',
    label: 'Engineering',
    children: [
      {
        id: 'frontend',
        label: 'Frontend',
        children: [
          { id: 'design-system', label: 'Design System' },
          { id: 'web-platform', label: 'Web Platform' },
        ],
      },
      {
        id: 'backend',
        label: 'Backend',
        children: [
          { id: 'apis', label: 'APIs' },
          { id: 'infra', label: 'Infrastructure' },
        ],
      },
    ],
  },
  {
    id: 'design',
    label: 'Design',
    children: [
      { id: 'product-design', label: 'Product Design' },
      { id: 'research', label: 'Research' },
    ],
  },
  {
    id: 'product',
    label: 'Product',
  },
];

interface TreeViewArgs {
  items: EdsTreeNode[];
  selectedId: string;
  expandedIds: Record<string, boolean>;
}

const meta: Meta<TreeViewArgs> = {
  title: 'Components/Tree View',
  component: 'eds-tree-view',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Hierarchical tree with expand/collapse and selection. Pass a nested `items` array for reliable Storybook rendering.',
      },
    },
    controls: { expanded: true },
    ...withSnippet(
      (args) => `<eds-tree-view${attr('selected-id', args.selectedId)}></eds-tree-view>
<!-- Set .items and .expandedIds via JavaScript properties -->`,
    ),
  },
  argTypes: {
    items: { control: 'object', table: { category: 'Content' } },
    selectedId: {
      control: 'text',
      description: 'Currently selected node id',
      table: { category: 'State', defaultValue: { summary: '' } },
    },
    expandedIds: {
      control: 'object',
      description: 'Map of node id to expanded state',
      table: { category: 'State', defaultValue: { summary: '{}' } },
    },
  },
  args: {
    items: sampleItems,
    selectedId: 'design-system',
    expandedIds: { engineering: true, frontend: true },
  },
  render: (args) => html`
    <eds-tree-view
      .items=${args.items}
      selected-id=${args.selectedId}
      .expandedIds=${args.expandedIds}
      @eds-select=${(event: CustomEvent<{ id: string }>) => {
        console.log('eds-select', event.detail);
      }}
      @eds-toggle=${(event: CustomEvent<{ id: string; expanded: boolean }>) => {
        console.log('eds-toggle', event.detail);
      }}
    ></eds-tree-view>
  `,
};

export default meta;
type Story = StoryObj<TreeViewArgs>;

export const Default: Story = {};

export const Collapsed: Story = {
  args: {
    selectedId: '',
    expandedIds: {},
  },
};

export const Empty: Story = {
  args: { items: [] },
};
