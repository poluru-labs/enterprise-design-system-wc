import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './eds-toast';
import { showToast } from './eds-toast';
import '../button/eds-button';
import '../icon/eds-icon';
import { iconArgType, type IconControlValue } from '../../storybook/icon-controls.js';
import { attr, withSnippet } from '../../storybook/snippet.js';

interface ToastArgs {
  message: string;
  variant: 'success' | 'info' | 'warning' | 'danger';
  open: boolean;
  duration: number;
  icon: IconControlValue;
  hideIcon: boolean;
}

const meta: Meta<ToastArgs> = {
  title: 'Components/Toast',
  component: 'eds-toast',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Transient notification with semantic icons. Override via **icon** Control or hide with `hide-icon`.',
      },
    },
    controls: { expanded: true },
    ...withSnippet(
      (args) =>
        `<eds-toast${attr('message', args.message)}${attr('variant', args.variant)}${attr('icon', args.icon)}${attr('hide-icon', args.hideIcon)}${attr('open', args.open)}${attr('duration', args.duration)}></eds-toast>`,
    ),
  },
  argTypes: {
    message: {
      control: 'text',
      description: 'Toast message text',
      table: { category: 'Content' },
    },
    variant: {
      control: 'select',
      options: ['success', 'info', 'warning', 'danger'],
      description: 'Semantic variant',
      table: { category: 'Appearance', defaultValue: { summary: 'info' } },
    },
    open: {
      control: 'boolean',
      description: 'Whether the toast is visible',
      table: { category: 'State', defaultValue: { summary: 'false' } },
    },
    duration: {
      control: { type: 'number', min: 0, step: 500 },
      description: 'Auto-dismiss delay in ms (`0` = sticky)',
      table: { category: 'Behavior', defaultValue: { summary: '5000' } },
    },
    icon: iconArgType('Override default variant icon'),
    hideIcon: {
      name: 'hide-icon',
      control: 'boolean',
      table: { category: 'Icons', defaultValue: { summary: 'false' } },
    },
  },
  args: {
    message: 'Your changes were saved successfully.',
    variant: 'success',
    open: true,
    duration: 0,
    icon: '',
    hideIcon: false,
  },
  render: (args) => html`
    <div style="padding:2rem;">
      <eds-toast
        message=${args.message}
        variant=${args.variant}
        icon=${args.icon}
        ?hide-icon=${args.hideIcon}
        ?open=${args.open}
        .duration=${args.duration}
      ></eds-toast>
    </div>
  `,
};

export default meta;
type Story = StoryObj<ToastArgs>;

export const Default: Story = {};

export const CustomIcon: Story = {
  args: {
    variant: 'info',
    message: 'New comment on your document.',
    icon: 'bell',
  },
};

export const AllVariants: Story = {
  parameters: {
    ...withSnippet(`<eds-toast-host>
  <eds-toast open variant="success" message="Profile updated successfully." duration="0"></eds-toast>
  <eds-toast open variant="info" message="A new version is available." duration="0"></eds-toast>
  <eds-toast open variant="warning" message="Storage is almost full." duration="0"></eds-toast>
  <eds-toast open variant="danger" message="Could not sync changes." duration="0"></eds-toast>
</eds-toast-host>`),
  },
  render: () => html`
    <eds-toast-host style="position:static;inset:auto;max-width:24rem;">
      <eds-toast open variant="success" message="Profile updated successfully." duration="0"></eds-toast>
      <eds-toast open variant="info" message="A new version is available." duration="0"></eds-toast>
      <eds-toast open variant="warning" message="Storage is almost full." duration="0"></eds-toast>
      <eds-toast open variant="danger" message="Could not sync changes." duration="0"></eds-toast>
    </eds-toast-host>
  `,
};

export const Imperative: Story = {
  parameters: {
    ...withSnippet(`<!-- Use showToast() from eds-toast -->
<eds-button variant="secondary" icon="check-circle">Show success</eds-button>
<eds-button variant="secondary" icon="bell">Show with icon</eds-button>`),
  },
  render: () => html`
    <div style="padding:2rem;display:flex;gap:12px;flex-wrap:wrap;">
      <eds-button
        variant="secondary"
        icon="check-circle"
        @eds-click=${() => showToast({ message: 'Saved.', variant: 'success' })}
      >
        Show success
      </eds-button>
      <eds-button
        variant="secondary"
        icon="bell"
        @eds-click=${() =>
          showToast({ message: 'You have a new notification.', variant: 'info', icon: 'bell' })}
      >
        Show with icon
      </eds-button>
    </div>
  `,
};
