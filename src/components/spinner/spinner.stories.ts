import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './eds-spinner';
import { attr, withSnippet } from '../../storybook/snippet.js';

interface SpinnerArgs {
  size: 'sm' | 'md' | 'lg';
  label: string;
  showLabel: boolean;
}

const meta: Meta<SpinnerArgs> = {
  title: 'Components/Spinner',
  component: 'eds-spinner',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Animated loading indicator with brand-colored ring and accessible status label.',
      },
    },
    controls: { expanded: true },
    ...withSnippet(
      (args) =>
        `<eds-spinner${attr('size', args.size)}${attr('label', args.label)}${attr('show-label', args.showLabel)}></eds-spinner>`,
    ),
  },
  argTypes: {
    size: {
      control: 'inline-radio',
      options: ['sm', 'md', 'lg'],
      table: { category: 'Appearance', defaultValue: { summary: 'md' } },
    },
    label: { control: 'text', table: { category: 'Content', defaultValue: { summary: 'Loading' } } },
    showLabel: {
      name: 'show-label',
      control: 'boolean',
      table: { category: 'Appearance', defaultValue: { summary: 'false' } },
    },
  },
  args: {
    size: 'md',
    label: 'Loading',
    showLabel: false,
  },
  render: (args) => html`
    <eds-spinner
      size=${args.size}
      label=${args.label}
      ?show-label=${args.showLabel}
    ></eds-spinner>
  `,
};

export default meta;
type Story = StoryObj<SpinnerArgs>;

export const Default: Story = {};

export const VisibleLabel: Story = {
  args: {
    showLabel: true,
    label: 'Saving changes…',
  },
};

export const Sizes: Story = {
  parameters: {
    controls: { disable: true },
    ...withSnippet(`<eds-spinner size="sm"></eds-spinner>
<eds-spinner size="md"></eds-spinner>
<eds-spinner size="lg"></eds-spinner>`),
  },
  render: () => html`
    <div style="display:flex;align-items:center;gap:24px;">
      <eds-spinner size="sm"></eds-spinner>
      <eds-spinner size="md"></eds-spinner>
      <eds-spinner size="lg"></eds-spinner>
    </div>
  `,
};
