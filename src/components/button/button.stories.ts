import type { Meta, StoryObj } from '@storybook/web-components';
import { html, nothing } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import './eds-button';
import '../icon/eds-icon';
import { iconArgType, type IconControlValue } from '../../storybook/icon-controls.js';
import { attr, withSnippet } from '../../storybook/snippet.js';

interface ButtonArgs {
  label: string;
  variant: 'primary' | 'secondary' | 'tertiary' | 'danger';
  size: 'sm' | 'md' | 'lg';
  disabled: boolean;
  loading: boolean;
  fullWidth: boolean;
  icon: IconControlValue;
  iconTrailing: IconControlValue;
  iconOnly: boolean;
}

const meta: Meta<ButtonArgs> = {
  title: 'Components/Button',
  component: 'eds-button',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Primary interactive control. Use **Icons** Controls for leading/trailing glyphs, or `icon-only` for square icon buttons.',
      },
      source: { type: 'code' },
    },
    controls: { expanded: true },
    ...withSnippet(
      (args) => `<eds-button${attr('variant', args.variant)}${attr('size', args.size)}${attr('icon', args.icon)}${attr('icon-trailing', args.iconTrailing)}${attr('icon-only', args.iconOnly)}${attr('disabled', args.disabled)}${attr('loading', args.loading)}${attr('full-width', args.fullWidth)}${args.iconOnly ? attr('aria-label', args.label) : ''}>
  ${args.iconOnly ? '' : args.label}
</eds-button>`,
    ),
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Button label text',
      table: { category: 'Content' },
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'danger'],
      description: 'Visual style variant',
      table: { category: 'Appearance', defaultValue: { summary: 'primary' } },
    },
    size: {
      control: 'inline-radio',
      options: ['sm', 'md', 'lg'],
      description: 'Control size',
      table: { category: 'Appearance', defaultValue: { summary: 'md' } },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables interaction',
      table: { category: 'State', defaultValue: { summary: 'false' } },
    },
    loading: {
      control: 'boolean',
      description: 'Shows loading spinner and disables the button',
      table: { category: 'State', defaultValue: { summary: 'false' } },
    },
    fullWidth: {
      name: 'full-width',
      control: 'boolean',
      description: 'Stretch to container width',
      table: { category: 'Layout', defaultValue: { summary: 'false' } },
    },
    icon: iconArgType('Leading icon from the design system set'),
    iconTrailing: {
      ...iconArgType('Trailing icon from the design system set'),
      name: 'icon-trailing',
    },
    iconOnly: {
      name: 'icon-only',
      control: 'boolean',
      description: 'Square icon button (uses aria-label from label)',
      table: { category: 'Icons', defaultValue: { summary: 'false' } },
    },
  },
  args: {
    label: 'Continue',
    variant: 'primary',
    size: 'md',
    disabled: false,
    loading: false,
    fullWidth: false,
    icon: '',
    iconTrailing: '',
    iconOnly: false,
  },
  render: (args) => html`
    <eds-button
      variant=${args.variant}
      size=${args.size}
      icon=${args.icon}
      icon-trailing=${args.iconTrailing}
      ?icon-only=${args.iconOnly}
      aria-label=${ifDefined(args.iconOnly ? args.label : undefined)}
      ?disabled=${args.disabled}
      ?loading=${args.loading}
      ?full-width=${args.fullWidth}
    >
      ${args.iconOnly ? nothing : args.label}
    </eds-button>
  `,
};

export default meta;
type Story = StoryObj<ButtonArgs>;

export const Primary: Story = {};

export const WithIcon: Story = {
  args: { icon: 'plus', label: 'Add item' },
};

export const TrailingIcon: Story = {
  args: { iconTrailing: 'chevron-right', label: 'Next', variant: 'secondary' },
};

export const IconOnly: Story = {
  args: { icon: 'settings', iconOnly: true, label: 'Settings' },
};

export const Secondary: Story = {
  args: { variant: 'secondary', label: 'Cancel' },
};

export const Tertiary: Story = {
  args: { variant: 'tertiary', label: 'Learn more', iconTrailing: 'external-link' },
};

export const Danger: Story = {
  args: { variant: 'danger', label: 'Delete', icon: 'trash' },
};

export const Sizes: Story = {
  parameters: {
    controls: { disable: true },
    ...withSnippet(`<div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap;">
  <eds-button size="sm" icon="plus">Small</eds-button>
  <eds-button size="md" icon="plus">Medium</eds-button>
  <eds-button size="lg" icon="plus">Large</eds-button>
</div>`),
  },
  render: () => html`
    <div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap;">
      <eds-button size="sm" icon="plus">Small</eds-button>
      <eds-button size="md" icon="plus">Medium</eds-button>
      <eds-button size="lg" icon="plus">Large</eds-button>
    </div>
  `,
};

export const Loading: Story = {
  args: { loading: true, label: 'Saving', icon: 'save' },
};

export const Disabled: Story = {
  args: { disabled: true, label: 'Unavailable', icon: 'lock' },
};

export const FullWidth: Story = {
  args: { fullWidth: true, label: 'Create workspace', icon: 'plus' },
  parameters: { layout: 'padded' },
  decorators: [(story) => html`<div style="width:min(100%,320px);">${story()}</div>`],
};
