import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import type { EdsListItemData } from './eds-list';
import './eds-list';
import { attr, withSnippet } from '../../storybook/snippet.js';

const sampleItems: EdsListItemData[] = [
  { label: 'Dashboard', description: 'Overview and metrics', icon: 'home' },
  { label: 'Projects', description: 'Manage active work', icon: 'folder' },
  { label: 'Team', description: 'Members and roles', icon: 'user' },
  { label: 'Settings', description: 'Preferences and billing', icon: 'settings' },
];

interface ListArgs {
  items: EdsListItemData[];
  divided: boolean;
  selectedIndex: number;
}

const meta: Meta<ListArgs> = {
  title: 'Components/List',
  component: 'eds-list',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Vertical list of selectable rows. Prefer the `items` property for Storybook; slot `eds-list-item` for custom markup.',
      },
    },
    controls: { expanded: true },
    ...withSnippet(
      (args) =>
        `<eds-list${attr('divided', args.divided)} .items=${JSON.stringify(args.items)}></eds-list>`,
    ),
  },
  argTypes: {
    items: { control: 'object', table: { category: 'Content' } },
    divided: { control: 'boolean', table: { category: 'Appearance', defaultValue: { summary: 'false' } } },
    selectedIndex: {
      control: { type: 'number', min: -1, max: 3, step: 1 },
      table: { category: 'Behavior' },
    },
  },
  args: {
    items: sampleItems,
    divided: true,
    selectedIndex: 0,
  },
  render: (args) => html`
    <eds-list
      style="width:min(100%,24rem);"
      .items=${args.items}
      .selectedIndex=${args.selectedIndex}
      ?divided=${args.divided}
      @eds-select=${(e: CustomEvent<{ label: string; index?: number }>) => {
        const target = e.currentTarget as HTMLElement & { selectedIndex: number };
        if (e.detail.index !== undefined) {
          target.selectedIndex = e.detail.index;
        }
      }}
    ></eds-list>
  `,
};

export default meta;
type Story = StoryObj<ListArgs>;

export const Default: Story = {};

export const Undivided: Story = {
  args: { divided: false },
};

export const SlottedItems: Story = {
  parameters: {
    controls: { disable: true },
    ...withSnippet(`<eds-list divided>
  <eds-list-item label="Inbox" description="12 unread" icon="mail"></eds-list-item>
  <eds-list-item label="Starred" icon="star" selected></eds-list-item>
  <eds-list-item label="Archive" icon="folder"></eds-list-item>
</eds-list>`),
  },
  render: () => html`
    <eds-list style="width:min(100%,24rem);" divided>
      <eds-list-item label="Inbox" description="12 unread" icon="mail"></eds-list-item>
      <eds-list-item label="Starred" icon="star" selected></eds-list-item>
      <eds-list-item label="Archive" icon="folder"></eds-list-item>
    </eds-list>
  `,
};
