import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './eds-divider';
import { attr, withSnippet } from '../../storybook/snippet.js';

interface DividerArgs {
  orientation: 'horizontal' | 'vertical';
  label: string;
  spacing: 'sm' | 'md' | 'lg';
}

const meta: Meta<DividerArgs> = {
  title: 'Components/Divider',
  component: 'eds-divider',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Visual separator with optional centered label for horizontal layouts.',
      },
    },
    controls: { expanded: true },
    ...withSnippet(
      (args) =>
        `<eds-divider${attr('orientation', args.orientation)}${attr('label', args.label)}${attr('spacing', args.spacing)}></eds-divider>`,
    ),
  },
  argTypes: {
    orientation: {
      control: 'inline-radio',
      options: ['horizontal', 'vertical'],
      table: { category: 'Appearance', defaultValue: { summary: 'horizontal' } },
    },
    label: { control: 'text', table: { category: 'Content' } },
    spacing: {
      control: 'inline-radio',
      options: ['sm', 'md', 'lg'],
      table: { category: 'Appearance', defaultValue: { summary: 'md' } },
    },
  },
  args: {
    orientation: 'horizontal',
    label: '',
    spacing: 'md',
  },
  render: (args) => html`
    <eds-divider
      orientation=${args.orientation}
      label=${args.label}
      spacing=${args.spacing}
    ></eds-divider>
  `,
};

export default meta;
type Story = StoryObj<DividerArgs>;

export const Default: Story = {};

export const WithLabel: Story = {
  args: {
    label: 'Or continue with',
  },
};

export const Vertical: Story = {
  args: {
    orientation: 'vertical',
  },
  render: (args) => html`
    <div style="display:flex;align-items:stretch;height:4rem;gap:8px;">
      <span style="display:flex;align-items:center;color:var(--eds-color-text-muted);font-size:14px;">Left</span>
      <eds-divider orientation=${args.orientation} spacing=${args.spacing}></eds-divider>
      <span style="display:flex;align-items:center;color:var(--eds-color-text-muted);font-size:14px;">Right</span>
    </div>
  `,
};

export const Spacing: Story = {
  parameters: {
    controls: { disable: true },
    ...withSnippet(`<eds-divider spacing="sm"></eds-divider>
<eds-divider spacing="md"></eds-divider>
<eds-divider spacing="lg"></eds-divider>`),
  },
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:0;">
      <p style="margin:0;color:var(--eds-color-text-muted);font-size:14px;">Section above</p>
      <eds-divider spacing="sm"></eds-divider>
      <p style="margin:0;color:var(--eds-color-text-muted);font-size:14px;">Small spacing</p>
      <eds-divider spacing="md"></eds-divider>
      <p style="margin:0;color:var(--eds-color-text-muted);font-size:14px;">Medium spacing</p>
      <eds-divider spacing="lg"></eds-divider>
      <p style="margin:0;color:var(--eds-color-text-muted);font-size:14px;">Large spacing</p>
    </div>
  `,
};
