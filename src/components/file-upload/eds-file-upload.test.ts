import { describe, it, expect, beforeEach } from 'vitest';
import { mount, resetDom, nextEvent, shadowQuery } from '../../test/helpers.js';
import './eds-file-upload.js';
import type { EdsFileUpload } from './eds-file-upload.js';

describe('eds-file-upload', () => {
  beforeEach(() => {
    resetDom();
  });

  it('renders dropzone with label and hint', async () => {
    const el = await mount<EdsFileUpload>('eds-file-upload', (node) => {
      node.label = 'Upload files';
      node.hint = 'PDF only';
    });

    expect(shadowQuery(el, '.label').textContent).toBe('Upload files');
    expect(shadowQuery(el, '.hint').textContent).toBe('PDF only');
    expect(shadowQuery(el, '.dropzone')).toBeTruthy();
  });

  it('emits eds-change when files are selected via the input', async () => {
    const el = await mount<EdsFileUpload>('eds-file-upload');
    const change = nextEvent<{ files: File[] }>(el, 'eds-change');
    const input = shadowQuery<HTMLInputElement>(el, 'input[type="file"]');
    const file = new File(['hello'], 'notes.txt', { type: 'text/plain' });
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);
    input.files = dataTransfer.files;
    input.dispatchEvent(new Event('change', { bubbles: true }));

    const event = await change;
    expect(event.detail.files).toHaveLength(1);
    expect(event.detail.files[0].name).toBe('notes.txt');
    expect(shadowQuery(el, '.file-item').textContent).toContain('notes.txt');
  });

  it('does not open the file dialog when disabled', async () => {
    const el = await mount<EdsFileUpload>('eds-file-upload', (node) => {
      node.disabled = true;
    });
    const input = shadowQuery<HTMLInputElement>(el, 'input[type="file"]');
    let clicked = false;
    input.click = () => {
      clicked = true;
    };

    shadowQuery<HTMLElement>(el, '.dropzone').click();

    expect(clicked).toBe(false);
    expect(shadowQuery(el, '.dropzone').getAttribute('data-disabled')).toBe('true');
  });

  it('supports keyboard activation and drag-and-drop', async () => {
    const el = await mount<EdsFileUpload>('eds-file-upload', (node) => {
      node.multiple = true;
    });
    const dropzone = shadowQuery<HTMLElement>(el, '.dropzone');
    const input = shadowQuery<HTMLInputElement>(el, 'input[type="file"]');
    let opened = false;
    input.click = () => {
      opened = true;
    };

    dropzone.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    expect(opened).toBe(true);

    const file = new File(['hello'], 'drop.txt', { type: 'text/plain' });
    const dataTransfer = {
      files: [file],
    } as unknown as DataTransfer;

    dropzone.dispatchEvent(new DragEvent('dragover', { bubbles: true, cancelable: true, dataTransfer }));
    await el.updateComplete;
    expect(dropzone.getAttribute('data-dragover')).toBe('true');

    dropzone.dispatchEvent(new DragEvent('dragleave', { bubbles: true, dataTransfer }));
    await el.updateComplete;

    const change = nextEvent<{ files: File[] }>(el, 'eds-change');
    const dropEvent = new Event('drop', { bubbles: true, cancelable: true });
    Object.defineProperty(dropEvent, 'dataTransfer', { value: { files: [file] } });
    dropzone.dispatchEvent(dropEvent);
    const event = await change;

    expect(event.detail.files[0].name).toBe('drop.txt');
  });
});
