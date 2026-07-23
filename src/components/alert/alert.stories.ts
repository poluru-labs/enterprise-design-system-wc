import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './eds-alert';
import '../icon/eds-icon';
import { iconArgType, type IconControlValue } from '../../storybook/icon-controls.js';
import { attr, withSnippet } from '../../storybook/snippet.js';

interface AlertArgs {
  variant: 'success' | 'info' | 'warning' | 'danger';
  title: string;
  message: string;
  dismissible: boolean;
  icon: IconControlValue;
  hideIcon: boolean;
}

const meta: Meta<AlertArgs> = {
  title: 'Components/Alert',
  component: 'eds-alert',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Inline alert with semantic icons. Override the glyph via the **icon** Control, or hide it with `hide-icon`.',
      },
    },
    controls: { expanded: true },
    ...withSnippet(
      (args) =>
        `<eds-alert${attr('variant', args.variant)}${attr('title', args.title)}${attr('message', args.message)}${attr('icon', args.icon)}${attr('hide-icon', args.hideIcon)}${attr('dismissible', args.dismissible)}></eds-alert>`,
    ),
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['success', 'info', 'warning', 'danger'],
      table: { category: 'Appearance', defaultValue: { summary: 'info' } },
    },
    title: { control: 'text', table: { category: 'Content' } },
    message: { control: 'text', table: { category: 'Content' } },
    dismissible: { control: 'boolean', table: { category: 'Behavior', defaultValue: { summary: 'false' } } },
    icon: iconArgType('Override default variant icon (leave empty for default)'),
    hideIcon: {
      name: 'hide-icon',
      control: 'boolean',
      description: 'Hide the status icon',
      table: { category: 'Icons', defaultValue: { summary: 'false' } },
    },
  },
  args: {
    variant: 'info',
    title: 'Information',
    message: 'Your profile has been updated successfully.',
    dismissible: false,
    icon: '',
    hideIcon: false,
  },
  render: (args) => html`
    <eds-alert
      style="width:min(100%,28rem);"
      variant=${args.variant}
      title=${args.title}
      message=${args.message}
      icon=${args.icon}
      ?hide-icon=${args.hideIcon}
      ?dismissible=${args.dismissible}
    ></eds-alert>
  `,
};

export default meta;
type Story = StoryObj<AlertArgs>;

export const Default: Story = {};

export const CustomIcon: Story = {
  args: {
    variant: 'info',
    title: 'New message',
    message: 'You have 3 unread notifications.',
    icon: 'bell',
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    title: 'Success',
    message: 'Your changes have been saved.',
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    title: 'Warning',
    message: 'Your subscription expires in 7 days.',
  },
};

export const Danger: Story = {
  args: {
    variant: 'danger',
    title: 'Error',
    message: 'Unable to process your request. Please try again.',
  },
};

export const Dismissible: Story = {
  args: {
    dismissible: true,
    title: 'Dismissible alert',
    message: 'Click the close button to dismiss this alert.',
  },
};

export const WithSlot: Story = {
  parameters: {
    controls: { disable: true },
    ...withSnippet(`<eds-alert variant="info" title="Custom content" icon="file">
  Review the <strong>updated policy</strong> before continuing.
</eds-alert>`),
  },
  render: () => html`
    <eds-alert variant="info" title="Custom content" icon="file">
      Review the <strong>updated policy</strong> before continuing.
    </eds-alert>
  `,
};
