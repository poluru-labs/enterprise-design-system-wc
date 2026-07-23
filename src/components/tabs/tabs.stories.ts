import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './eds-tabs';
import { attr, withSnippet } from '../../storybook/snippet.js';

interface TabsArgs {
  selectedIndex: number;
}

const meta: Meta<TabsArgs> = {
  title: 'Components/Tabs',
  component: 'eds-tabs',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Keyboard-accessible tab set. Use arrow keys, Home, and End to move between tabs. Compose with `eds-tab` children.',
      },
    },
    controls: { expanded: true },
    ...withSnippet(
      (args) => `<eds-tabs${attr('selected-index', args.selectedIndex)}>
  <eds-tab label="Overview">Product overview copy lives here.</eds-tab>
  <eds-tab label="Specs">Technical specifications and notes.</eds-tab>
  <eds-tab label="Changelog">Release notes and migration guidance.</eds-tab>
</eds-tabs>`,
    ),
  },
  argTypes: {
    selectedIndex: {
      name: 'selected-index',
      control: { type: 'number', min: 0, max: 2, step: 1 },
      description: 'Zero-based index of the active tab',
      table: { category: 'State', defaultValue: { summary: '0' } },
    },
  },
  args: {
    selectedIndex: 0,
  },
  render: (args) => html`
    <eds-tabs selected-index=${args.selectedIndex}>
      <eds-tab label="Overview">
        Product overview copy lives here. Keep panels concise and scannable.
      </eds-tab>
      <eds-tab label="Specs">
        Technical specifications, token references, and implementation notes.
      </eds-tab>
      <eds-tab label="Changelog">
        Release notes and migration guidance for consumers of the design system.
      </eds-tab>
    </eds-tabs>
  `,
};

export default meta;
type Story = StoryObj<TabsArgs>;

export const Default: Story = {};

export const SecondTab: Story = {
  args: { selectedIndex: 1 },
};

export const WithDisabledTab: Story = {
  parameters: {
    ...withSnippet(`<eds-tabs>
  <eds-tab label="Active">This panel is available.</eds-tab>
  <eds-tab label="Disabled" disabled>You should not see this.</eds-tab>
  <eds-tab label="Available">Another available panel.</eds-tab>
</eds-tabs>`),
  },
  render: () => html`
    <eds-tabs>
      <eds-tab label="Active">This panel is available.</eds-tab>
      <eds-tab label="Disabled" disabled>You should not see this.</eds-tab>
      <eds-tab label="Available">Another available panel.</eds-tab>
    </eds-tabs>
  `,
};
