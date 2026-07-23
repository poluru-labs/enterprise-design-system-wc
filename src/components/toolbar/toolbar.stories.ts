import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './eds-toolbar';
import '../button/eds-button';
import '../icon/eds-icon';
import { attr, withSnippet } from '../../storybook/snippet.js';

interface ToolbarArgs {
  bordered: boolean;
  sticky: boolean;
}

const meta: Meta<ToolbarArgs> = {
  title: 'Components/Toolbar',
  component: 'eds-toolbar',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Horizontal toolbar chrome with `start`, `center`, and `end` slots for app headers and action bars.',
      },
    },
    controls: { expanded: true },
    ...withSnippet(
      (args) => `<eds-toolbar${attr('bordered', args.bordered)}${attr('sticky', args.sticky)}>
  <eds-button slot="start" variant="tertiary" icon="menu" icon-only aria-label="Menu"></eds-button>
  <span slot="center" style="font-weight:600;">Dashboard</span>
  <eds-button slot="end" variant="secondary" size="sm">Export</eds-button>
  <eds-button slot="end" variant="primary" size="sm">Create</eds-button>
</eds-toolbar>`,
    ),
  },
  argTypes: {
    bordered: { control: 'boolean', table: { category: 'Appearance', defaultValue: { summary: 'false' } } },
    sticky: { control: 'boolean', table: { category: 'Behavior', defaultValue: { summary: 'false' } } },
  },
  args: {
    bordered: true,
    sticky: false,
  },
  render: (args) => html`
    <eds-toolbar ?bordered=${args.bordered} ?sticky=${args.sticky}>
      <eds-button slot="start" variant="tertiary" icon="menu" icon-only aria-label="Menu"></eds-button>
      <span slot="center" style="font-weight:600;">Dashboard</span>
      <eds-button slot="end" variant="secondary" size="sm">Export</eds-button>
      <eds-button slot="end" variant="primary" size="sm">Create</eds-button>
    </eds-toolbar>
  `,
};

export default meta;
type Story = StoryObj<ToolbarArgs>;

export const Default: Story = {};

export const WithoutBorder: Story = {
  args: { bordered: false },
};

export const DefaultSlot: Story = {
  parameters: {
    controls: { disable: true },
    ...withSnippet(`<eds-toolbar bordered>
  <eds-button slot="start" variant="tertiary" icon="home" icon-only aria-label="Home"></eds-button>
  <span>Projects</span>
  <eds-button slot="end" variant="primary" size="sm">New project</eds-button>
</eds-toolbar>`),
  },
  render: () => html`
    <eds-toolbar bordered>
      <eds-button slot="start" variant="tertiary" icon="home" icon-only aria-label="Home"></eds-button>
      <span>Projects</span>
      <eds-button slot="end" variant="primary" size="sm">New project</eds-button>
    </eds-toolbar>
  `,
};
