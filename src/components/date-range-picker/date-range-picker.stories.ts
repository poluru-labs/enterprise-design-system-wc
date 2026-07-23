import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './eds-date-range-picker';
import { attr, withSnippet } from '../../storybook/snippet.js';

interface DateRangePickerArgs {
  label: string;
  startValue: string;
  endValue: string;
  min: string;
  max: string;
  disabled: boolean;
}

const meta: Meta<DateRangePickerArgs> = {
  title: 'Components/Date Range Picker',
  component: 'eds-date-range-picker',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Two-step date range picker. Click a start date, then an end date. Emits `eds-change` with `{ start, end }` ISO strings.',
      },
      source: {
        type: 'code',
      },
    },
    controls: { expanded: true },
    ...withSnippet(
      (args) => `<eds-date-range-picker${attr('label', args.label)}${attr('start-value', args.startValue)}${attr('end-value', args.endValue)}${attr('min', args.min)}${attr('max', args.max)}${attr('disabled', args.disabled)}></eds-date-range-picker>`,
    ),
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Field label',
      table: { category: 'Content' },
    },
    startValue: {
      name: 'start-value',
      control: 'text',
      description: 'Range start date (YYYY-MM-DD)',
      table: { category: 'Content' },
    },
    endValue: {
      name: 'end-value',
      control: 'text',
      description: 'Range end date (YYYY-MM-DD)',
      table: { category: 'Content' },
    },
    min: {
      control: 'text',
      description: 'Earliest selectable date (YYYY-MM-DD)',
      table: { category: 'Validation' },
    },
    max: {
      control: 'text',
      description: 'Latest selectable date (YYYY-MM-DD)',
      table: { category: 'Validation' },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables interaction',
      table: { category: 'State', defaultValue: { summary: 'false' } },
    },
  },
  args: {
    label: 'Travel dates',
    startValue: '',
    endValue: '',
    min: '',
    max: '',
    disabled: false,
  },
  render: (args) => html`
    <eds-date-range-picker
      label=${args.label}
      start-value=${args.startValue}
      end-value=${args.endValue}
      min=${args.min}
      max=${args.max}
      ?disabled=${args.disabled}
    ></eds-date-range-picker>
  `,
};

export default meta;
type Story = StoryObj<DateRangePickerArgs>;

export const Default: Story = {};

export const WithValues: Story = {
  args: {
    startValue: '2026-07-10',
    endValue: '2026-07-18',
  },
};

export const WithMinMax: Story = {
  args: {
    min: '2026-07-01',
    max: '2026-07-31',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    startValue: '2026-07-10',
    endValue: '2026-07-18',
  },
};
