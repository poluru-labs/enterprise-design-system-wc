import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './eds-tooltip';
import '../button/eds-button';
import { attr, withSnippet } from '../../storybook/snippet.js';

interface TooltipArgs {
  content: string;
  placement: 'top' | 'bottom' | 'left' | 'right';
  delay: number;
}

const meta: Meta<TooltipArgs> = {
  title: 'Components/Tooltip',
  component: 'eds-tooltip',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Wraps a trigger element and shows supplementary text on hover or keyboard focus. Uses `role="tooltip"` and `aria-describedby` for accessibility.',
      },
    },
    controls: { expanded: true },
    ...withSnippet(
      (args) => `<eds-tooltip${attr('content', args.content)}${attr('placement', args.placement)}${attr('delay', args.delay)}>
  <eds-button variant="secondary">Hover or focus me</eds-button>
</eds-tooltip>`,
    ),
  },
  argTypes: {
    content: {
      control: 'text',
      description: 'Tooltip text',
      table: { category: 'Content' },
    },
    placement: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
      description: 'Preferred placement relative to the trigger',
      table: { category: 'Appearance', defaultValue: { summary: 'top' } },
    },
    delay: {
      control: { type: 'number', min: 0, step: 50 },
      description: 'Show delay in milliseconds',
      table: { category: 'Behavior', defaultValue: { summary: '200' } },
    },
  },
  args: {
    content: 'Additional context for this action',
    placement: 'top',
    delay: 200,
  },
  render: (args) => html`
    <div style="padding:4rem;display:flex;justify-content:center;">
      <eds-tooltip content=${args.content} placement=${args.placement} .delay=${args.delay}>
        <eds-button variant="secondary">Hover or focus me</eds-button>
      </eds-tooltip>
    </div>
  `,
};

export default meta;
type Story = StoryObj<TooltipArgs>;

export const Default: Story = {};

export const Placements: Story = {
  parameters: {
    ...withSnippet(`<eds-tooltip content="Top placement" placement="top">
  <eds-button variant="tertiary">Top</eds-button>
</eds-tooltip>

<eds-tooltip content="Bottom placement" placement="bottom">
  <eds-button variant="tertiary">Bottom</eds-button>
</eds-tooltip>

<eds-tooltip content="Left placement" placement="left">
  <eds-button variant="tertiary">Left</eds-button>
</eds-tooltip>

<eds-tooltip content="Right placement" placement="right">
  <eds-button variant="tertiary">Right</eds-button>
</eds-tooltip>`),
  },
  render: () => html`
    <div
      style="padding:5rem;display:grid;grid-template-columns:repeat(2,auto);gap:3rem;justify-content:center;"
    >
      <eds-tooltip content="Top placement" placement="top">
        <eds-button variant="tertiary">Top</eds-button>
      </eds-tooltip>
      <eds-tooltip content="Bottom placement" placement="bottom">
        <eds-button variant="tertiary">Bottom</eds-button>
      </eds-tooltip>
      <eds-tooltip content="Left placement" placement="left">
        <eds-button variant="tertiary">Left</eds-button>
      </eds-tooltip>
      <eds-tooltip content="Right placement" placement="right">
        <eds-button variant="tertiary">Right</eds-button>
      </eds-tooltip>
    </div>
  `,
};
