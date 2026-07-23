import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './eds-visually-hidden';
import '../button/eds-button';
import { withSnippet } from '../../storybook/snippet.js';

const meta: Meta = {
  title: 'Components/Visually Hidden',
  component: 'eds-visually-hidden',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Accessibility primitive that hides content visually while keeping it available to screen readers.',
      },
    },
    controls: { expanded: true },
    ...withSnippet(`<eds-button variant="primary" icon="search" icon-only>
  <eds-visually-hidden>Search</eds-visually-hidden>
</eds-button>`),
  },
  render: () => html`
    <eds-button variant="primary" icon="search" icon-only>
      <eds-visually-hidden>Search</eds-visually-hidden>
    </eds-button>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};

export const WithVisibleLabel: Story = {
  parameters: {
    ...withSnippet(`<p>
  Visible label:
  <strong>Settings</strong>
  <eds-visually-hidden> — opens account settings</eds-visually-hidden>
</p>`),
  },
  render: () => html`
    <p>
      Visible label:
      <strong>Settings</strong>
      <eds-visually-hidden> — opens account settings</eds-visually-hidden>
    </p>
  `,
};
