import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './eds-input';
import '../icon/eds-icon';
import { iconArgType, type IconControlValue } from '../../storybook/icon-controls.js';
import { attr, withSnippet } from '../../storybook/snippet.js';

interface InputArgs {
  label: string;
  type: 'text' | 'email' | 'password' | 'number' | 'search' | 'tel' | 'url';
  value: string;
  placeholder: string;
  name: string;
  disabled: boolean;
  readonly: boolean;
  required: boolean;
  invalid: boolean;
  errorMessage: string;
  hint: string;
  size: 'sm' | 'md' | 'lg';
  icon: IconControlValue;
  iconTrailing: IconControlValue;
}

const meta: Meta<InputArgs> = {
  title: 'Components/Input',
  component: 'eds-input',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Text input with optional leading/trailing icons. Use the **Icons** Controls to try glyphs like `search`, `mail`, or `lock`.',
      },
      source: { type: 'code' },
    },
    controls: { expanded: true },
    ...withSnippet(
      (args) => `<eds-input${attr('label', args.label)}${attr('type', args.type)}${attr('value', args.value)}${attr('placeholder', args.placeholder)}${attr('name', args.name)}${attr('hint', args.hint)}${attr('error-message', args.errorMessage)}${attr('size', args.size)}${attr('icon', args.icon)}${attr('icon-trailing', args.iconTrailing)}${attr('disabled', args.disabled)}${attr('readonly', args.readonly)}${attr('required', args.required)}${attr('invalid', args.invalid)} style="width:min(100%,320px);"></eds-input>`,
    ),
  },
  argTypes: {
    label: { control: 'text', table: { category: 'Content' } },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'search', 'tel', 'url'],
      table: { category: 'Content', defaultValue: { summary: 'text' } },
    },
    value: { control: 'text', table: { category: 'Content' } },
    placeholder: { control: 'text', table: { category: 'Content' } },
    name: { control: 'text', table: { category: 'Content' } },
    hint: { control: 'text', table: { category: 'Content' } },
    errorMessage: { name: 'error-message', control: 'text', table: { category: 'Content' } },
    size: {
      control: 'inline-radio',
      options: ['sm', 'md', 'lg'],
      table: { category: 'Appearance', defaultValue: { summary: 'md' } },
    },
    disabled: { control: 'boolean', table: { category: 'State', defaultValue: { summary: 'false' } } },
    readonly: { control: 'boolean', table: { category: 'State', defaultValue: { summary: 'false' } } },
    required: { control: 'boolean', table: { category: 'State', defaultValue: { summary: 'false' } } },
    invalid: { control: 'boolean', table: { category: 'State', defaultValue: { summary: 'false' } } },
    icon: iconArgType('Leading icon'),
    iconTrailing: {
      ...iconArgType('Trailing icon'),
      name: 'icon-trailing',
    },
  },
  args: {
    label: 'Email address',
    type: 'email',
    value: '',
    placeholder: 'you@company.com',
    name: 'email',
    disabled: false,
    readonly: false,
    required: false,
    invalid: false,
    errorMessage: '',
    hint: 'We will never share your email.',
    size: 'md',
    icon: 'mail',
    iconTrailing: '',
  },
  render: (args) => html`
    <eds-input
      style="width:min(100%,320px);"
      label=${args.label}
      type=${args.type}
      value=${args.value}
      placeholder=${args.placeholder}
      name=${args.name}
      hint=${args.hint}
      error-message=${args.errorMessage}
      size=${args.size}
      icon=${args.icon}
      icon-trailing=${args.iconTrailing}
      ?disabled=${args.disabled}
      ?readonly=${args.readonly}
      ?required=${args.required}
      ?invalid=${args.invalid}
    ></eds-input>
  `,
};

export default meta;
type Story = StoryObj<InputArgs>;

export const Default: Story = {};

export const Search: Story = {
  args: {
    label: 'Search',
    type: 'search',
    icon: 'search',
    placeholder: 'Find workspaces…',
    hint: '',
    name: 'q',
  },
};

export const Password: Story = {
  args: {
    label: 'Password',
    type: 'password',
    icon: 'lock',
    iconTrailing: 'eye',
    placeholder: '••••••••',
    hint: 'At least 8 characters.',
    name: 'password',
  },
};

export const Invalid: Story = {
  args: {
    invalid: true,
    errorMessage: 'Enter a valid email address.',
    hint: '',
    icon: 'mail',
  },
};

export const Sizes: Story = {
  parameters: {
    controls: { disable: true },
    ...withSnippet(`<div style="display:flex;flex-direction:column;gap:16px;max-width:320px;">
  <eds-input label="Small" size="sm" icon="search" placeholder="Small input"></eds-input>
  <eds-input label="Medium" size="md" icon="search" placeholder="Medium input"></eds-input>
  <eds-input label="Large" size="lg" icon="search" placeholder="Large input"></eds-input>
</div>`),
  },
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:16px;max-width:320px;">
      <eds-input label="Small" size="sm" icon="search" placeholder="Small input"></eds-input>
      <eds-input label="Medium" size="md" icon="search" placeholder="Medium input"></eds-input>
      <eds-input label="Large" size="lg" icon="search" placeholder="Large input"></eds-input>
    </div>
  `,
};

export const Disabled: Story = {
  args: { disabled: true, value: 'locked@company.com', icon: 'lock' },
};
