import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import type { EdsStepperStep } from './eds-stepper';
import './eds-stepper';
import { attr, withSnippet } from '../../storybook/snippet.js';

const sampleSteps: EdsStepperStep[] = [
  { label: 'Account', description: 'Sign in or register' },
  { label: 'Details', description: 'Personal information' },
  { label: 'Review', description: 'Confirm and submit' },
];

interface StepperArgs {
  steps: EdsStepperStep[];
  current: number;
  orientation: 'horizontal' | 'vertical';
}

const meta: Meta<StepperArgs> = {
  title: 'Components/Stepper',
  component: 'eds-stepper',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Visual step indicators with connectors. Click completed or current steps to navigate (`eds-step-click`).',
      },
    },
    controls: { expanded: true },
    ...withSnippet(
      (args) =>
        `<eds-stepper${attr('current', args.current)}${attr('orientation', args.orientation)} .steps=${JSON.stringify(args.steps)}></eds-stepper>`,
    ),
  },
  argTypes: {
    steps: { control: 'object', table: { category: 'Content' } },
    current: { control: { type: 'number', min: 0, max: 2, step: 1 }, table: { category: 'Behavior' } },
    orientation: {
      control: 'inline-radio',
      options: ['horizontal', 'vertical'],
      table: { category: 'Appearance', defaultValue: { summary: 'horizontal' } },
    },
  },
  args: {
    steps: sampleSteps,
    current: 1,
    orientation: 'horizontal',
  },
  render: (args) => html`
    <eds-stepper
      style="width:min(100%,36rem);"
      .steps=${args.steps}
      .current=${args.current}
      orientation=${args.orientation}
      @eds-step-click=${(e: CustomEvent<{ index: number }>) => {
        const target = e.currentTarget as HTMLElement & { current: number };
        target.current = e.detail.index;
      }}
    ></eds-stepper>
  `,
};

export default meta;
type Story = StoryObj<StepperArgs>;

export const Default: Story = {};

export const Vertical: Story = {
  args: {
    orientation: 'vertical',
    current: 0,
  },
};

export const Completed: Story = {
  args: {
    current: 2,
  },
};
