import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './eds-autocomplete';
import { attr, withSnippet } from '../../storybook/snippet.js';

const suggestions = [
  'San Francisco, CA',
  'San Diego, CA',
  'San Jose, CA',
  'Santa Clara, CA',
  'Seattle, WA',
  'Austin, TX',
  'Boston, MA',
  'Chicago, IL',
];

interface AutocompleteArgs {
  label: string;
  value: string;
  placeholder: string;
  disabled: boolean;
  minChars: number;
}

const meta: Meta<AutocompleteArgs> = {
  title: 'Components/Autocomplete',
  component: 'eds-autocomplete',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Free-text input with filtered suggestions. Allows values not in the list.',
      },
      source: { type: 'code' },
    },
    controls: { expanded: true },
    ...withSnippet(
      (args) => `<eds-autocomplete${attr('label', args.label)}${attr('value', args.value)}${attr('placeholder', args.placeholder)}${attr('min-chars', args.minChars)}${attr('disabled', args.disabled)}></eds-autocomplete>
<!-- Set suggestions in JavaScript: element.suggestions = ['San Francisco, CA', 'Seattle, WA', ...] -->`,
    ),
  },
  argTypes: {
    label: { control: 'text', table: { category: 'Content' } },
    value: { control: 'text', table: { category: 'Content' } },
    placeholder: { control: 'text', table: { category: 'Content' } },
    minChars: {
      name: 'min-chars',
      control: { type: 'number', min: 0, max: 5 },
      table: { category: 'Behavior', defaultValue: { summary: '1' } },
    },
    disabled: { control: 'boolean', table: { category: 'State', defaultValue: { summary: 'false' } } },
  },
  args: {
    label: 'City',
    value: '',
    placeholder: 'Start typing a city…',
    disabled: false,
    minChars: 1,
  },
  render: (args) => html`
    <eds-autocomplete
      label=${args.label}
      value=${args.value}
      placeholder=${args.placeholder}
      min-chars=${args.minChars}
      .suggestions=${suggestions}
      ?disabled=${args.disabled}
    ></eds-autocomplete>
  `,
};

export default meta;
type Story = StoryObj<AutocompleteArgs>;

export const Default: Story = {};

export const WithValue: Story = {
  args: { value: 'Seattle, WA' },
};

export const MinChars: Story = {
  args: { minChars: 2, placeholder: 'Type at least 2 characters…' },
};

export const Disabled: Story = {
  args: { disabled: true, value: 'Boston, MA' },
};
