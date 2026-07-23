import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './eds-modal';
import '../button/eds-button';
import { attr, withSnippet } from '../../storybook/snippet.js';

interface ModalArgs {
  heading: string;
  closeOnBackdrop: boolean;
  closeOnEscape: boolean;
}

const meta: Meta<ModalArgs> = {
  title: 'Components/Modal',
  component: 'eds-modal',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Modal dialog with focus trap, Escape-to-close, and optional backdrop dismiss. Toggle `open` or call `show()` / `close()`.',
      },
    },
    controls: { expanded: true },
    ...withSnippet(
      (args) => `<eds-button>Open modal</eds-button>
<eds-modal${attr('heading', args.heading)}${attr('close-on-backdrop', args.closeOnBackdrop)}${attr('close-on-escape', args.closeOnEscape)}>
  <p>This action cannot be undone. Review the details carefully before continuing.</p>
  <div slot="footer">
    <eds-button variant="secondary">Cancel</eds-button>
    <eds-button>Confirm</eds-button>
  </div>
</eds-modal>`,
    ),
  },
  argTypes: {
    heading: {
      control: 'text',
      description: 'Dialog title',
      table: { category: 'Content' },
    },
    closeOnBackdrop: {
      name: 'close-on-backdrop',
      control: 'boolean',
      description: 'Close when clicking the backdrop',
      table: { category: 'Behavior', defaultValue: { summary: 'true' } },
    },
    closeOnEscape: {
      name: 'close-on-escape',
      control: 'boolean',
      description: 'Close when pressing Escape',
      table: { category: 'Behavior', defaultValue: { summary: 'true' } },
    },
  },
  args: {
    heading: 'Confirm action',
    closeOnBackdrop: true,
    closeOnEscape: true,
  },
  render: (args) => {
    const openModal = (event: Event) => {
      const host = (event.currentTarget as HTMLElement).parentElement;
      const modal = host?.querySelector('eds-modal');
      modal?.setAttribute('open', '');
    };

    const closeModal = (event: Event) => {
      const modal = (event.currentTarget as HTMLElement).closest('eds-modal');
      modal?.removeAttribute('open');
    };

    return html`
      <div style="padding:2rem;">
        <eds-button @eds-click=${openModal}>Open modal</eds-button>
        <eds-modal
          heading=${args.heading}
          ?close-on-backdrop=${args.closeOnBackdrop}
          ?close-on-escape=${args.closeOnEscape}
        >
          <p style="margin:0;">
            This action cannot be undone. Review the details carefully before continuing.
          </p>
          <div slot="footer">
            <eds-button variant="secondary" @eds-click=${closeModal}>Cancel</eds-button>
            <eds-button @eds-click=${closeModal}>Confirm</eds-button>
          </div>
        </eds-modal>
      </div>
    `;
  },
};

export default meta;
type Story = StoryObj<ModalArgs>;

export const Default: Story = {};

export const CustomHeading: Story = {
  args: {
    heading: 'Archive workspace?',
  },
};
