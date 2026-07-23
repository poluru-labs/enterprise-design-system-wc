import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '../button/eds-button';
import './eds-card';
import { attr, withSnippet } from '../../storybook/snippet.js';

interface CardArgs {
  elevated: boolean;
  padded: boolean;
}

const meta: Meta<CardArgs> = {
  title: 'Components/Card',
  component: 'eds-card',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Surface container with header, body, footer, and media slots.',
      },
    },
    controls: { expanded: true },
    ...withSnippet(
      (args) => `<eds-card${attr('elevated', args.elevated)}${attr('padded', args.padded)}>
  <div slot="header">
    <h3>Quarterly review</h3>
    <p>Updated 2 hours ago</p>
  </div>
  <p>Review team performance metrics and prepare action items.</p>
  <div slot="footer">
    <eds-button variant="tertiary">Dismiss</eds-button>
    <eds-button variant="primary">Open report</eds-button>
  </div>
</eds-card>`,
    ),
  },
  argTypes: {
    elevated: { control: 'boolean', table: { category: 'Appearance', defaultValue: { summary: 'false' } } },
    padded: { control: 'boolean', table: { category: 'Appearance', defaultValue: { summary: 'true' } } },
  },
  args: {
    elevated: false,
    padded: true,
  },
  render: (args) => html`
    <eds-card ?elevated=${args.elevated} ?padded=${args.padded} style="max-width: 24rem;">
      <div slot="header">
        <h3 style="margin:0;font-family:var(--eds-font-display);font-size:var(--eds-font-size-lg);">
          Quarterly review
        </h3>
        <p style="margin:var(--eds-space-1) 0 0;font-size:var(--eds-font-size-sm);color:var(--eds-color-text-muted);">
          Updated 2 hours ago
        </p>
      </div>
      <p style="margin:0;line-height:var(--eds-line-height-relaxed);">
        Review team performance metrics and prepare action items for the next planning cycle.
      </p>
      <div slot="footer" style="display:flex;gap:8px;justify-content:flex-end;">
        <eds-button variant="tertiary">Dismiss</eds-button>
        <eds-button variant="primary">Open report</eds-button>
      </div>
    </eds-card>
  `,
};

export default meta;
type Story = StoryObj<CardArgs>;

export const Default: Story = {};

export const Elevated: Story = {
  args: { elevated: true },
};

export const WithMedia: Story = {
  parameters: {
    controls: { disable: true },
    ...withSnippet(`<eds-card elevated>
  <div slot="media"><!-- hero image --></div>
  <div slot="header">
    <h3>Enterprise onboarding</h3>
  </div>
  <p>Complete the setup checklist to activate your workspace.</p>
</eds-card>`),
  },
  render: () => html`
    <eds-card elevated style="max-width: 24rem;overflow:hidden;">
      <div slot="media">
        <div
          style="height:140px;background:linear-gradient(135deg,var(--eds-color-brand-100),var(--eds-color-brand-300));"
        ></div>
      </div>
      <div slot="header">
        <h3 style="margin:0;font-family:var(--eds-font-display);">Enterprise onboarding</h3>
      </div>
      <p style="margin:0;">Complete the setup checklist to activate your workspace.</p>
    </eds-card>
  `,
};

export const Compact: Story = {
  args: { padded: false },
  render: (args) => html`
    <eds-card ?elevated=${args.elevated} ?padded=${args.padded} style="max-width: 20rem;">
      <p style="margin:0;padding:var(--eds-space-4);">Unpadded card body with custom spacing.</p>
    </eds-card>
  `,
};
