import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './eds-accordion';
import { attr, withSnippet } from '../../storybook/snippet.js';

interface AccordionArgs {
  single: boolean;
}

const meta: Meta<AccordionArgs> = {
  title: 'Components/Accordion',
  component: 'eds-accordion',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Expandable sections for FAQs and progressive disclosure. Set `single` to allow only one open item at a time.',
      },
    },
    controls: { expanded: true },
    ...withSnippet(
      (args) => `<eds-accordion${attr('single', args.single)}>
  <eds-accordion-item heading="What is this design system?" open>
    A Lit-based web component library with shared tokens and documented patterns.
  </eds-accordion-item>
  <eds-accordion-item heading="How do I install it?">
    Install the package, import the component, and include the token stylesheet once.
  </eds-accordion-item>
  <eds-accordion-item heading="Does it work with React / Vue / Angular?">
    Yes. Web components are framework-agnostic.
  </eds-accordion-item>
</eds-accordion>`,
    ),
  },
  argTypes: {
    single: {
      control: 'boolean',
      description: 'Allow only one open item',
      table: { category: 'Behavior', defaultValue: { summary: 'false' } },
    },
  },
  args: {
    single: false,
  },
  render: (args) => html`
    <eds-accordion ?single=${args.single}>
      <eds-accordion-item heading="What is this design system?" open>
        A Lit-based web component library with shared tokens, typography, and documented patterns for enterprise products.
      </eds-accordion-item>
      <eds-accordion-item heading="How do I install it?">
        Install the package, import the component you need, and include the token stylesheet once at the application root.
      </eds-accordion-item>
      <eds-accordion-item heading="Does it work with React / Vue / Angular?">
        Yes. Web components are framework-agnostic. Wrap them or use them directly in templates.
      </eds-accordion-item>
    </eds-accordion>
  `,
};

export default meta;
type Story = StoryObj<AccordionArgs>;

export const Default: Story = {};

export const SingleExpand: Story = {
  args: { single: true },
};
