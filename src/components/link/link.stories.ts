import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './eds-link';
import { attr, withSnippet } from '../../storybook/snippet.js';

interface LinkArgs {
  href: string;
  target: string;
  rel: string;
  external: boolean;
  disabled: boolean;
  variant: 'default' | 'subtle' | 'danger';
  label: string;
}

const meta: Meta<LinkArgs> = {
  title: 'Components/Link',
  component: 'eds-link',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Accessible anchor link with variants and optional external indicator.',
      },
    },
    controls: { expanded: true },
    ...withSnippet(
      (args) =>
        `<eds-link${attr('href', args.href)}${attr('target', args.target)}${attr('rel', args.rel)}${attr('external', args.external)}${attr('disabled', args.disabled)}${attr('variant', args.variant)}>${args.label}</eds-link>`,
    ),
  },
  argTypes: {
    href: { control: 'text', table: { category: 'Navigation' } },
    target: { control: 'text', table: { category: 'Navigation' } },
    rel: { control: 'text', table: { category: 'Navigation' } },
    external: { control: 'boolean', table: { category: 'Navigation', defaultValue: { summary: 'false' } } },
    disabled: { control: 'boolean', table: { category: 'State', defaultValue: { summary: 'false' } } },
    variant: {
      control: 'inline-radio',
      options: ['default', 'subtle', 'danger'],
      table: { category: 'Appearance', defaultValue: { summary: 'default' } },
    },
    label: { control: 'text', table: { category: 'Content' } },
  },
  args: {
    href: 'https://example.com/docs',
    target: '',
    rel: '',
    external: false,
    disabled: false,
    variant: 'default',
    label: 'View documentation',
  },
  render: (args) => html`
    <eds-link
      href=${args.href}
      target=${args.target}
      rel=${args.rel}
      ?external=${args.external}
      ?disabled=${args.disabled}
      variant=${args.variant}
    >${args.label}</eds-link>
  `,
};

export default meta;
type Story = StoryObj<LinkArgs>;

export const Default: Story = {};

export const External: Story = {
  args: {
    external: true,
    label: 'Open in new tab',
  },
};

export const Subtle: Story = {
  args: {
    variant: 'subtle',
    href: '/settings',
    label: 'Account settings',
  },
};

export const Danger: Story = {
  args: {
    variant: 'danger',
    href: '/delete-account',
    label: 'Delete account',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'Unavailable link',
  },
};

export const Variants: Story = {
  parameters: {
    controls: { disable: true },
    ...withSnippet(`<eds-link href="https://example.com">Default link</eds-link>
<eds-link href="/help" variant="subtle">Subtle link</eds-link>
<eds-link href="/remove" variant="danger">Danger link</eds-link>`),
  },
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:12px;align-items:flex-start;">
      <eds-link href="https://example.com">Default link</eds-link>
      <eds-link href="/help" variant="subtle">Subtle link</eds-link>
      <eds-link href="/remove" variant="danger">Danger link</eds-link>
    </div>
  `,
};
