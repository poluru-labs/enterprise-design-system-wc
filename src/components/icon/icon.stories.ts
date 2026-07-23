import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './eds-icon';
import { EDS_ICON_NAMES, type EdsIconName } from '../../icons/paths.js';
import { iconArgType } from '../../storybook/icon-controls.js';
import { attr, withSnippet } from '../../storybook/snippet.js';

interface IconArgs {
  name: EdsIconName;
  size: 'sm' | 'md' | 'lg';
  decorative: boolean;
  label: string;
}

const meta: Meta<IconArgs> = {
  title: 'Foundations/Icons',
  component: 'eds-icon',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Built-in SVG icon set. Use `name` with Controls to preview icons, or pass the same names into Button, Input, Alert, Toast, and Menu Item.',
      },
    },
    controls: { expanded: true },
    ...withSnippet(
      (args) => `<eds-icon${attr('name', args.name)}${attr('size', args.size)}></eds-icon>`,
    ),
  },
  argTypes: {
    name: iconArgType('Icon glyph name'),
    size: {
      control: 'inline-radio',
      options: ['sm', 'md', 'lg'],
      table: { category: 'Appearance', defaultValue: { summary: 'md' } },
    },
    decorative: {
      control: 'boolean',
      description: 'When true, hides from assistive tech',
      table: { category: 'Accessibility', defaultValue: { summary: 'true' } },
    },
    label: {
      control: 'text',
      description: 'Accessible label when decorative is false',
      table: { category: 'Accessibility' },
    },
  },
  args: {
    name: 'search',
    size: 'md',
    decorative: true,
    label: '',
  },
  render: (args) => html`
    <eds-icon
      name=${args.name}
      size=${args.size}
      ?decorative=${args.decorative}
      label=${args.label}
    ></eds-icon>
  `,
};

export default meta;
type Story = StoryObj<IconArgs>;

export const Playground: Story = {};

export const Catalog: Story = {
  parameters: {
    controls: { disable: true },
    ...withSnippet(`<eds-icon name="search" size="lg"></eds-icon>
<eds-icon name="plus" size="lg"></eds-icon>
<eds-icon name="settings" size="lg"></eds-icon>
<!-- See EDS_ICON_NAMES for the full catalog -->`),
  },
  render: () => html`
    <div
      style="
        display:grid;
        grid-template-columns:repeat(auto-fill,minmax(7.5rem,1fr));
        gap:12px;
        width:min(100%,42rem);
        color:var(--eds-color-text);
      "
    >
      ${EDS_ICON_NAMES.map(
        (name) => html`
          <div
            style="
              display:flex;
              flex-direction:column;
              align-items:center;
              gap:8px;
              padding:12px 8px;
              border:1px solid var(--eds-color-border);
              border-radius:8px;
              background:var(--eds-color-surface);
              font-size:12px;
            "
          >
            <eds-icon name=${name} size="lg"></eds-icon>
            <span style="color:var(--eds-color-text-muted);">${name}</span>
          </div>
        `,
      )}
    </div>
  `,
};
