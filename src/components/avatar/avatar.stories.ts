import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './eds-avatar';
import { attr, withSnippet } from '../../storybook/snippet.js';

interface AvatarArgs {
  name: string;
  src: string;
  size: 'sm' | 'md' | 'lg' | 'xl';
  alt: string;
}

const meta: Meta<AvatarArgs> = {
  title: 'Components/Avatar',
  component: 'eds-avatar',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Circular avatar displaying an image or initials from a name.',
      },
    },
    controls: { expanded: true },
    ...withSnippet(
      (args) =>
        `<eds-avatar${attr('name', args.name)}${attr('src', args.src)}${attr('size', args.size)}${attr('alt', args.alt)}></eds-avatar>`,
    ),
  },
  argTypes: {
    name: { control: 'text', table: { category: 'Content' } },
    src: { control: 'text', table: { category: 'Content' } },
    alt: { control: 'text', table: { category: 'Content' } },
    size: {
      control: 'inline-radio',
      options: ['sm', 'md', 'lg', 'xl'],
      table: { category: 'Appearance', defaultValue: { summary: 'md' } },
    },
  },
  args: {
    name: 'Subrahmanyam Poluru',
    src: '',
    size: 'md',
    alt: '',
  },
  render: (args) => html`
    <eds-avatar
      name=${args.name}
      src=${args.src}
      size=${args.size}
      alt=${args.alt}
    ></eds-avatar>
  `,
};

export default meta;
type Story = StoryObj<AvatarArgs>;

export const Default: Story = {};

export const WithImage: Story = {
  args: {
    name: 'Subrahmanyam Poluru',
    src: 'https://i.pravatar.cc/120?img=12',
    alt: 'Subrahmanyam Poluru profile photo',
  },
};

export const SingleName: Story = {
  args: {
    name: 'Alex',
    src: '',
  },
};

export const Sizes: Story = {
  parameters: {
    controls: { disable: true },
    ...withSnippet(`<eds-avatar name="Subrahmanyam Poluru" size="sm"></eds-avatar>
<eds-avatar name="Subrahmanyam Poluru" size="md"></eds-avatar>
<eds-avatar name="Subrahmanyam Poluru" size="lg"></eds-avatar>
<eds-avatar name="Subrahmanyam Poluru" size="xl"></eds-avatar>`),
  },
  render: () => html`
    <div style="display:flex;align-items:center;gap:16px;">
      <eds-avatar name="Subrahmanyam Poluru" size="sm"></eds-avatar>
      <eds-avatar name="Subrahmanyam Poluru" size="md"></eds-avatar>
      <eds-avatar name="Subrahmanyam Poluru" size="lg"></eds-avatar>
      <eds-avatar name="Subrahmanyam Poluru" size="xl"></eds-avatar>
    </div>
  `,
};

export const ImageFallback: Story = {
  args: {
    name: 'Sam Rivera',
    src: 'https://invalid.example/avatar.png',
    alt: 'Sam Rivera',
  },
};
