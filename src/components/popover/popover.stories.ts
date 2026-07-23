import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './eds-popover';
import '../button/eds-button';
import { attr, withSnippet } from '../../storybook/snippet.js';

interface PopoverArgs {
  heading: string;
  placement: 'top' | 'bottom' | 'left' | 'right';
  open: boolean;
}

const meta: Meta<PopoverArgs> = {
  title: 'Components/Popover',
  component: 'eds-popover',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Click-triggered floating panel with optional heading. Closes on Escape or outside click. Emits `eds-open` and `eds-close`.',
      },
    },
    controls: { expanded: true },
    ...withSnippet(
      (args) => `<eds-popover${attr('heading', args.heading)}${attr('placement', args.placement)}${attr('open', args.open)}>
  <eds-button slot="trigger" variant="secondary">Open popover</eds-button>
  <p>Refine results by status, owner, or date range.</p>
</eds-popover>`,
    ),
  },
  argTypes: {
    heading: {
      control: 'text',
      description: 'Optional panel heading',
      table: { category: 'Content' },
    },
    placement: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
      description: 'Panel placement relative to trigger',
      table: { category: 'Appearance', defaultValue: { summary: 'bottom' } },
    },
    open: {
      control: 'boolean',
      description: 'Whether the popover is open',
      table: { category: 'State', defaultValue: { summary: 'false' } },
    },
  },
  args: {
    heading: 'Filter options',
    placement: 'bottom',
    open: false,
  },
  render: (args) => html`
    <div style="padding:4rem;">
      <eds-popover
        heading=${args.heading}
        placement=${args.placement}
        ?open=${args.open}
        @eds-open=${() => console.log('eds-open')}
        @eds-close=${() => console.log('eds-close')}
      >
        <eds-button slot="trigger" variant="secondary">Open popover</eds-button>
        <p style="margin:0;">
          Refine results by status, owner, or date range. Changes apply immediately.
        </p>
      </eds-popover>
    </div>
  `,
};

export default meta;
type Story = StoryObj<PopoverArgs>;

export const Default: Story = {};

export const NoHeading: Story = {
  args: {
    heading: '',
  },
};
