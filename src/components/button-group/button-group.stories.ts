import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './eds-button-group';
import '../button/eds-button';
import { attr, withSnippet } from '../../storybook/snippet.js';

interface ButtonGroupArgs {
  orientation: 'horizontal' | 'vertical';
  size: 'sm' | 'md' | 'lg';
}

const meta: Meta<ButtonGroupArgs> = {
  title: 'Components/Button Group',
  component: 'eds-button-group',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Attached button group with shared borders. Slot `eds-button` children; size is inherited from the group host.',
      },
    },
    controls: { expanded: true },
    ...withSnippet(
      (args) => `<eds-button-group${attr('orientation', args.orientation)}${attr('size', args.size)}>
  <eds-button variant="secondary">Left</eds-button>
  <eds-button variant="secondary">Center</eds-button>
  <eds-button variant="secondary">Right</eds-button>
</eds-button-group>`,
    ),
  },
  argTypes: {
    orientation: {
      control: 'inline-radio',
      options: ['horizontal', 'vertical'],
      table: { category: 'Appearance', defaultValue: { summary: 'horizontal' } },
    },
    size: {
      control: 'inline-radio',
      options: ['sm', 'md', 'lg'],
      table: { category: 'Appearance', defaultValue: { summary: 'md' } },
    },
  },
  args: {
    orientation: 'horizontal',
    size: 'md',
  },
  render: (args) => html`
    <eds-button-group orientation=${args.orientation} size=${args.size}>
      <eds-button variant="secondary">Left</eds-button>
      <eds-button variant="secondary">Center</eds-button>
      <eds-button variant="secondary">Right</eds-button>
    </eds-button-group>
  `,
};

export default meta;
type Story = StoryObj<ButtonGroupArgs>;

export const Default: Story = {};

export const Vertical: Story = {
  args: { orientation: 'vertical' },
};

export const Small: Story = {
  args: { size: 'sm' },
};

export const MixedVariants: Story = {
  parameters: {
    controls: { disable: true },
    ...withSnippet(`<eds-button-group>
  <eds-button variant="primary">Save</eds-button>
  <eds-button variant="secondary">Cancel</eds-button>
</eds-button-group>`),
  },
  render: () => html`
    <eds-button-group>
      <eds-button variant="primary">Save</eds-button>
      <eds-button variant="secondary">Cancel</eds-button>
    </eds-button-group>
  `,
};
