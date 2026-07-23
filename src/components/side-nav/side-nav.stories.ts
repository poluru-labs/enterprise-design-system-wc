import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import type { EdsSideNavItem } from './eds-side-nav';
import './eds-side-nav';
import { attr, withSnippet } from '../../storybook/snippet.js';

const sampleItems: EdsSideNavItem[] = [
  { label: 'Dashboard', href: '#', icon: 'home', active: true },
  { label: 'Projects', href: '#', icon: 'folder' },
  {
    label: 'Settings',
    icon: 'settings',
    children: [
      { label: 'Profile', href: '#', icon: 'user' },
      { label: 'Billing', href: '#', icon: 'file' },
    ],
  },
  { label: 'Help', href: '#', icon: 'info' },
];

interface SideNavArgs {
  items: EdsSideNavItem[];
  collapsed: boolean;
}

const meta: Meta<SideNavArgs> = {
  title: 'Components/Side Nav',
  component: 'eds-side-nav',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Vertical navigation for app shells. Supports one level of nested children and a collapsed icon-only mode.',
      },
    },
    controls: { expanded: true },
    ...withSnippet(
      (args) =>
        `<eds-side-nav${attr('collapsed', args.collapsed)} .items=${JSON.stringify(args.items)}></eds-side-nav>`,
    ),
  },
  argTypes: {
    items: { control: 'object', table: { category: 'Content' } },
    collapsed: { control: 'boolean', table: { category: 'Appearance', defaultValue: { summary: 'false' } } },
  },
  args: {
    items: sampleItems,
    collapsed: false,
  },
  render: (args) => html`
    <eds-side-nav
      style="width:${args.collapsed ? '3.5rem' : 'min(100%,14rem)'};"
      .items=${args.items}
      ?collapsed=${args.collapsed}
      @eds-navigate=${(e: CustomEvent<{ label: string; href?: string }>) => {
        const items = args.items.map((item) => ({
          ...item,
          active: item.label === e.detail.label,
          children: item.children?.map((child) => ({
            ...child,
            active: child.label === e.detail.label,
          })),
        }));
        const target = e.currentTarget as HTMLElement & { items: EdsSideNavItem[] };
        target.items = items;
      }}
    ></eds-side-nav>
  `,
};

export default meta;
type Story = StoryObj<SideNavArgs>;

export const Default: Story = {};

export const Collapsed: Story = {
  args: { collapsed: true },
};

export const FlatItems: Story = {
  args: {
    items: [
      { label: 'Overview', href: '#', icon: 'home', active: true },
      { label: 'Analytics', href: '#', icon: 'filter' },
      { label: 'Reports', href: '#', icon: 'file' },
    ],
  },
};
