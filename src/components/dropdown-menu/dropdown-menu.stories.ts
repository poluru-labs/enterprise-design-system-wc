import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './eds-dropdown-menu';
import '../button/eds-button';
import '../icon/eds-icon';
import { iconArgType, type IconControlValue } from '../../storybook/icon-controls.js';
import { attr, withSnippet } from '../../storybook/snippet.js';

interface DropdownMenuArgs {
  placement: 'top' | 'bottom' | 'left' | 'right';
  open: boolean;
  firstItemIcon: IconControlValue;
}

const meta: Meta<DropdownMenuArgs> = {
  title: 'Components/Dropdown Menu',
  component: 'eds-dropdown-menu',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Action menu with optional icons on `eds-menu-item`. Use the **firstItemIcon** Control to preview iconography on the first item.',
      },
    },
    controls: { expanded: true },
    ...withSnippet(
      (args) => `<eds-dropdown-menu${attr('placement', args.placement)}${attr('open', args.open)}>
  <eds-button slot="trigger" variant="secondary" icon="more-horizontal" icon-only aria-label="Actions"></eds-button>
  <eds-menu-item value="edit" label="Edit" icon="${args.firstItemIcon || 'edit'}"></eds-menu-item>
  <eds-menu-item value="duplicate" label="Duplicate" icon="copy"></eds-menu-item>
  <eds-menu-item value="archive" label="Archive" icon="folder" disabled></eds-menu-item>
  <eds-menu-item value="delete" label="Delete" icon="trash" danger></eds-menu-item>
</eds-dropdown-menu>`,
    ),
  },
  argTypes: {
    placement: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
      description: 'Menu placement relative to trigger',
      table: { category: 'Appearance', defaultValue: { summary: 'bottom' } },
    },
    open: {
      control: 'boolean',
      description: 'Whether the menu is open',
      table: { category: 'State', defaultValue: { summary: 'false' } },
    },
    firstItemIcon: iconArgType('Icon for the first menu item (Edit)'),
  },
  args: {
    placement: 'bottom',
    open: true,
    firstItemIcon: 'edit',
  },
  render: (args) => html`
    <div style="padding:4rem;min-height:14rem;">
      <eds-dropdown-menu placement=${args.placement} ?open=${args.open}>
        <eds-button slot="trigger" variant="secondary" icon="more-horizontal" icon-only aria-label="Actions">
        </eds-button>
        <eds-menu-item value="edit" label="Edit" icon=${args.firstItemIcon || 'edit'}></eds-menu-item>
        <eds-menu-item value="duplicate" label="Duplicate" icon="copy"></eds-menu-item>
        <eds-menu-item value="archive" label="Archive" icon="folder" disabled></eds-menu-item>
        <eds-menu-item value="delete" label="Delete" icon="trash" danger></eds-menu-item>
      </eds-dropdown-menu>
    </div>
  `,
};

export default meta;
type Story = StoryObj<DropdownMenuArgs>;

export const Default: Story = {};

export const WithIcons: Story = {
  args: { open: true, firstItemIcon: 'edit' },
};
