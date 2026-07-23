import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './eds-search';
import { attr, withSnippet } from '../../storybook/snippet.js';

interface SearchArgs {
  value: string;
  placeholder: string;
  disabled: boolean;
  size: 'sm' | 'md' | 'lg';
  clearable: boolean;
}

const meta: Meta<SearchArgs> = {
  title: 'Components/Search',
  component: 'eds-search',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Search field with leading icon and optional clear button. Emits `eds-input`, `eds-change`, and `eds-clear`.',
      },
      source: { type: 'code' },
    },
    controls: { expanded: true },
    ...withSnippet(
      (args) =>
        `<eds-search${attr('value', args.value)}${attr('placeholder', args.placeholder)}${attr('size', args.size)}${attr('clearable', args.clearable)}${attr('disabled', args.disabled)} style="width:min(100%,320px);"></eds-search>`,
    ),
  },
  argTypes: {
    value: { control: 'text', table: { category: 'Content' } },
    placeholder: { control: 'text', table: { category: 'Content' } },
    size: {
      control: 'inline-radio',
      options: ['sm', 'md', 'lg'],
      table: { category: 'Appearance', defaultValue: { summary: 'md' } },
    },
    clearable: { control: 'boolean', table: { category: 'Behavior', defaultValue: { summary: 'true' } } },
    disabled: { control: 'boolean', table: { category: 'State', defaultValue: { summary: 'false' } } },
  },
  args: {
    value: '',
    placeholder: 'Search workspaces…',
    disabled: false,
    size: 'md',
    clearable: true,
  },
  render: (args) => html`
    <eds-search
      style="width:min(100%,320px);"
      value=${args.value}
      placeholder=${args.placeholder}
      size=${args.size}
      ?clearable=${args.clearable}
      ?disabled=${args.disabled}
      @eds-input=${(e: CustomEvent<{ value: string }>) => {
        const target = e.currentTarget as HTMLElement & { value: string };
        target.value = e.detail.value;
      }}
    ></eds-search>
  `,
};

export default meta;
type Story = StoryObj<SearchArgs>;

export const Default: Story = {};

export const WithValue: Story = {
  args: {
    value: 'Design system',
  },
};

export const Sizes: Story = {
  parameters: {
    controls: { disable: true },
    ...withSnippet(`<div style="display:flex;flex-direction:column;gap:16px;max-width:320px;">
  <eds-search size="sm" placeholder="Small search"></eds-search>
  <eds-search size="md" placeholder="Medium search"></eds-search>
  <eds-search size="lg" placeholder="Large search"></eds-search>
</div>`),
  },
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:16px;max-width:320px;">
      <eds-search size="sm" placeholder="Small search"></eds-search>
      <eds-search size="md" placeholder="Medium search"></eds-search>
      <eds-search size="lg" placeholder="Large search"></eds-search>
    </div>
  `,
};

export const Disabled: Story = {
  args: {
    value: 'Locked query',
    disabled: true,
  },
};
