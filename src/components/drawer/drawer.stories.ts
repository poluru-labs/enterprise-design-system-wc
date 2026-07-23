import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './eds-drawer';
import '../button/eds-button';
import { attr, withSnippet } from '../../storybook/snippet.js';

interface DrawerArgs {
  heading: string;
  side: 'left' | 'right';
  size: 'sm' | 'md' | 'lg';
  open: boolean;
}

const meta: Meta<DrawerArgs> = {
  title: 'Components/Drawer',
  component: 'eds-drawer',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Side panel overlay with backdrop dismiss, Escape-to-close, and body scroll lock. Emits `eds-open` and `eds-close`.',
      },
    },
    controls: { expanded: true },
    ...withSnippet(
      (args) => `<eds-button>Open drawer</eds-button>
<eds-drawer${attr('heading', args.heading)}${attr('side', args.side)}${attr('size', args.size)}${attr('open', args.open)}>
  <p>Configure notifications, integrations, and team access for this workspace.</p>
  <div slot="footer">
    <eds-button variant="secondary">Cancel</eds-button>
    <eds-button>Save</eds-button>
  </div>
</eds-drawer>`,
    ),
  },
  argTypes: {
    heading: {
      control: 'text',
      description: 'Drawer title',
      table: { category: 'Content' },
    },
    side: {
      control: 'inline-radio',
      options: ['left', 'right'],
      description: 'Which edge the panel slides from',
      table: { category: 'Appearance', defaultValue: { summary: 'right' } },
    },
    size: {
      control: 'inline-radio',
      options: ['sm', 'md', 'lg'],
      description: 'Panel width preset',
      table: { category: 'Appearance', defaultValue: { summary: 'md' } },
    },
    open: {
      control: 'boolean',
      description: 'Whether the drawer is open',
      table: { category: 'State', defaultValue: { summary: 'false' } },
    },
  },
  args: {
    heading: 'Workspace settings',
    side: 'right',
    size: 'md',
    open: false,
  },
  render: (args) => {
    const openDrawer = () => {
      document.querySelector('eds-drawer')?.setAttribute('open', '');
    };

    const closeDrawer = () => {
      document.querySelector('eds-drawer')?.removeAttribute('open');
    };

    return html`
      <div style="padding:2rem;">
        <eds-button @eds-click=${openDrawer}>Open drawer</eds-button>
        <eds-drawer
          heading=${args.heading}
          side=${args.side}
          size=${args.size}
          ?open=${args.open}
        >
          <p style="margin:0;">
            Configure notifications, integrations, and team access for this workspace.
          </p>
          <div slot="footer">
            <eds-button variant="secondary" @eds-click=${closeDrawer}>Cancel</eds-button>
            <eds-button @eds-click=${closeDrawer}>Save</eds-button>
          </div>
        </eds-drawer>
      </div>
    `;
  },
};

export default meta;
type Story = StoryObj<DrawerArgs>;

export const Default: Story = {};

export const LeftSide: Story = {
  args: {
    side: 'left',
    heading: 'Navigation',
  },
};
