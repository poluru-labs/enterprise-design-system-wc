import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './eds-empty-state';
import '../button/eds-button';
import { iconArgType, type IconControlValue } from '../../storybook/icon-controls.js';
import { attr, withSnippet } from '../../storybook/snippet.js';

interface EmptyStateArgs {
  heading: string;
  description: string;
  icon: IconControlValue;
}

const meta: Meta<EmptyStateArgs> = {
  title: 'Components/Empty State',
  component: 'eds-empty-state',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Centered empty UI for no-data screens. Slot **actions** for buttons or links.',
      },
    },
    controls: { expanded: true },
    ...withSnippet(
      (args) =>
        `<eds-empty-state${attr('heading', args.heading)}${attr('description', args.description)}${attr('icon', args.icon)}>
  <eds-button slot="actions" variant="primary">Create item</eds-button>
</eds-empty-state>`,
    ),
  },
  argTypes: {
    heading: { control: 'text', table: { category: 'Content' } },
    description: { control: 'text', table: { category: 'Content' } },
    icon: iconArgType('Leading icon (empty to hide)'),
  },
  args: {
    heading: 'No results found',
    description: 'Try adjusting your filters or create a new item to get started.',
    icon: 'folder',
  },
  render: (args) => html`
    <eds-empty-state
      style="width:min(100%,32rem);"
      heading=${args.heading}
      description=${args.description}
      icon=${args.icon}
    >
      <eds-button slot="actions" variant="primary">Create item</eds-button>
      <eds-button slot="actions" variant="secondary">Learn more</eds-button>
    </eds-empty-state>
  `,
};

export default meta;
type Story = StoryObj<EmptyStateArgs>;

export const Default: Story = {};

export const NoIcon: Story = {
  args: {
    icon: '',
    heading: 'Nothing here yet',
    description: 'Content will appear once data is available.',
  },
};

export const Minimal: Story = {
  args: {
    heading: 'Empty folder',
    description: '',
    icon: 'folder',
  },
  render: (args) => html`
    <eds-empty-state
      style="width:min(100%,32rem);"
      heading=${args.heading}
      icon=${args.icon}
    ></eds-empty-state>
  `,
};
