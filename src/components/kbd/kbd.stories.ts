import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './eds-kbd';
import { attr, withSnippet } from '../../storybook/snippet.js';

interface KbdArgs {
  keys: string;
  slotContent: string;
}

const meta: Meta<KbdArgs> = {
  title: 'Components/Kbd',
  component: 'eds-kbd',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Keyboard shortcut badge for inline documentation and UI hints.',
      },
    },
    controls: { expanded: true },
    ...withSnippet((args) => {
      if (args.keys) {
        return `<eds-kbd${attr('keys', args.keys)}></eds-kbd>`;
      }
      return `<eds-kbd>${args.slotContent}</eds-kbd>`;
    }),
  },
  argTypes: {
    keys: { control: 'text', table: { category: 'Content' } },
    slotContent: { control: 'text', table: { category: 'Content' } },
  },
  args: {
    keys: '⌘+K',
    slotContent: 'Ctrl+K',
  },
  render: (args) =>
    args.keys
      ? html`<eds-kbd keys=${args.keys}></eds-kbd>`
      : html`<eds-kbd>${args.slotContent}</eds-kbd>`,
};

export default meta;
type Story = StoryObj<KbdArgs>;

export const Default: Story = {};

export const FromSlot: Story = {
  args: {
    keys: '',
    slotContent: 'Esc',
  },
};

export const Sequence: Story = {
  parameters: {
    controls: { disable: true },
    ...withSnippet(`<span>Press <eds-kbd keys="⌘"></eds-kbd> + <eds-kbd keys="K"></eds-kbd> to search</span>`),
  },
  render: () => html`
    <span style="font-size:14px;color:var(--eds-color-text);">
      Press <eds-kbd keys="⌘"></eds-kbd> + <eds-kbd keys="K"></eds-kbd> to search
    </span>
  `,
};

export const CommonShortcuts: Story = {
  parameters: {
    controls: { disable: true },
    ...withSnippet(`<eds-kbd keys="⌘+K"></eds-kbd>
<eds-kbd keys="Ctrl+Shift+P"></eds-kbd>
<eds-kbd>Enter</eds-kbd>`),
  },
  render: () => html`
    <div style="display:flex;flex-wrap:wrap;gap:12px;align-items:center;">
      <eds-kbd keys="⌘+K"></eds-kbd>
      <eds-kbd keys="Ctrl+Shift+P"></eds-kbd>
      <eds-kbd>Enter</eds-kbd>
    </div>
  `,
};
