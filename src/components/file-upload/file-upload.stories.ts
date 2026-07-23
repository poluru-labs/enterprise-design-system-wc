import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './eds-file-upload';
import '../icon/eds-icon';
import { iconArgType, type IconControlValue } from '../../storybook/icon-controls.js';
import { attr, withSnippet } from '../../storybook/snippet.js';

interface FileUploadArgs {
  label: string;
  accept: string;
  multiple: boolean;
  disabled: boolean;
  hint: string;
  icon: IconControlValue;
}

const meta: Meta<FileUploadArgs> = {
  title: 'Components/File Upload',
  component: 'eds-file-upload',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Drag-and-drop file upload. Use the **icon** Control to change the dropzone glyph.',
      },
    },
    controls: { expanded: true },
    ...withSnippet(
      (args) =>
        `<eds-file-upload${attr('label', args.label)}${attr('accept', args.accept)}${attr('hint', args.hint)}${attr('icon', args.icon || 'upload')}${attr('multiple', args.multiple)}${attr('disabled', args.disabled)}></eds-file-upload>`,
    ),
  },
  argTypes: {
    label: { control: 'text', table: { category: 'Content' } },
    accept: { control: 'text', table: { category: 'Content' } },
    hint: { control: 'text', table: { category: 'Content' } },
    multiple: { control: 'boolean', table: { category: 'Behavior', defaultValue: { summary: 'false' } } },
    disabled: { control: 'boolean', table: { category: 'State', defaultValue: { summary: 'false' } } },
    icon: iconArgType('Dropzone icon'),
  },
  args: {
    label: 'Attachments',
    accept: '.pdf,.png,.jpg',
    multiple: false,
    disabled: false,
    hint: 'PDF, PNG, or JPG up to 10 MB.',
    icon: 'upload',
  },
  render: (args) => html`
    <eds-file-upload
      style="width:min(100%,28rem);"
      label=${args.label}
      accept=${args.accept}
      hint=${args.hint}
      icon=${args.icon || 'upload'}
      ?multiple=${args.multiple}
      ?disabled=${args.disabled}
    ></eds-file-upload>
  `,
};

export default meta;
type Story = StoryObj<FileUploadArgs>;

export const Default: Story = {};

export const FolderIcon: Story = {
  args: { icon: 'folder', label: 'Project files' },
};

export const Multiple: Story = {
  args: {
    multiple: true,
    hint: 'Select one or more files.',
    icon: 'upload',
  },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const ImagesOnly: Story = {
  args: {
    label: 'Profile photo',
    accept: 'image/*',
    hint: 'PNG or JPG recommended.',
    icon: 'file',
  },
};
