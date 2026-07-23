import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './eds-rating';
import { attr, withSnippet } from '../../storybook/snippet.js';

interface RatingArgs {
  value: number;
  max: number;
  readonly: boolean;
  disabled: boolean;
  size: 'sm' | 'md' | 'lg';
  allowHalf: boolean;
}

const meta: Meta<RatingArgs> = {
  title: 'Components/Rating',
  component: 'eds-rating',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Star rating control with optional half-star selection. Emits `eds-change` with `{ value }`.',
      },
      source: { type: 'code' },
    },
    controls: { expanded: true },
    ...withSnippet(
      (args) =>
        `<eds-rating${attr('value', args.value)}${attr('max', args.max)}${attr('size', args.size)}${attr('readonly', args.readonly)}${attr('disabled', args.disabled)}${attr('allow-half', args.allowHalf)}></eds-rating>`,
    ),
  },
  argTypes: {
    value: { control: { type: 'number', min: 0, max: 5, step: 0.5 }, table: { category: 'Content' } },
    max: { control: { type: 'number', min: 1, max: 10, step: 1 }, table: { category: 'Content', defaultValue: { summary: '5' } } },
    size: {
      control: 'inline-radio',
      options: ['sm', 'md', 'lg'],
      table: { category: 'Appearance', defaultValue: { summary: 'md' } },
    },
    readonly: { control: 'boolean', table: { category: 'State', defaultValue: { summary: 'false' } } },
    disabled: { control: 'boolean', table: { category: 'State', defaultValue: { summary: 'false' } } },
    allowHalf: {
      name: 'allow-half',
      control: 'boolean',
      table: { category: 'Behavior', defaultValue: { summary: 'false' } },
    },
  },
  args: {
    value: 3,
    max: 5,
    readonly: false,
    disabled: false,
    size: 'md',
    allowHalf: false,
  },
  render: (args) => html`
    <eds-rating
      .value=${args.value}
      .max=${args.max}
      size=${args.size}
      ?readonly=${args.readonly}
      ?disabled=${args.disabled}
      ?allow-half=${args.allowHalf}
      @eds-change=${(e: CustomEvent<{ value: number }>) => {
        const target = e.currentTarget as HTMLElement & { value: number };
        target.value = e.detail.value;
      }}
    ></eds-rating>
  `,
};

export default meta;
type Story = StoryObj<RatingArgs>;

export const Default: Story = {};

export const HalfStars: Story = {
  args: {
    value: 3.5,
    allowHalf: true,
  },
};

export const ReadOnly: Story = {
  args: {
    value: 4,
    readonly: true,
  },
};

export const Sizes: Story = {
  parameters: {
    controls: { disable: true },
    ...withSnippet(`<div style="display:flex;flex-direction:column;gap:16px;align-items:flex-start;">
  <eds-rating value="2" size="sm"></eds-rating>
  <eds-rating value="3" size="md"></eds-rating>
  <eds-rating value="4" size="lg"></eds-rating>
</div>`),
  },
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:16px;align-items:flex-start;">
      <eds-rating .value=${2} size="sm"></eds-rating>
      <eds-rating .value=${3} size="md"></eds-rating>
      <eds-rating .value=${4} size="lg"></eds-rating>
    </div>
  `,
};

export const Disabled: Story = {
  args: {
    value: 2,
    disabled: true,
  },
};
