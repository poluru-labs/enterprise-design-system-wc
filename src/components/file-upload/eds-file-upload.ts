import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { focusRing, fieldStyles, hostBase } from '../../foundations/shared.js';
import type { EdsIconName } from '../../icons/paths.js';
import '../icon/eds-icon.js';

export interface EdsFileUploadChangeDetail {
  files: File[];
}

/**
 * Drag-and-drop file upload with click-to-browse support.
 *
 * @fires eds-change - Fired when selected files change
 *
 * @element eds-file-upload
 */
@customElement('eds-file-upload')
export class EdsFileUpload extends LitElement {
  static override styles = [
    hostBase,
    fieldStyles,
    css`
      :host {
        display: block;
        width: 100%;
      }

      .dropzone {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: var(--eds-space-2);
        min-height: 8rem;
        padding: var(--eds-space-5);
        border: 1px dashed var(--eds-color-border-strong);
        border-radius: var(--eds-radius-lg);
        background: var(--eds-color-surface);
        color: var(--eds-color-text-muted);
        text-align: center;
        cursor: pointer;
        transition:
          border-color var(--eds-duration-fast) var(--eds-easing-standard),
          background-color var(--eds-duration-fast) var(--eds-easing-standard),
          box-shadow var(--eds-duration-fast) var(--eds-easing-standard);
      }

      .dropzone:hover:not([data-disabled='true']) {
        border-color: var(--eds-color-primary);
        background: var(--eds-color-brand-50);
      }

      .dropzone[data-dragover='true'] {
        border-color: var(--eds-color-primary);
        background: var(--eds-color-brand-50);
        box-shadow: var(--eds-shadow-focus);
      }

      .dropzone[data-disabled='true'] {
        opacity: 0.55;
        cursor: not-allowed;
        background: var(--eds-color-ink-50);
      }

      ${focusRing}

      .icon {
        display: inline-flex;
        color: var(--eds-color-primary);
        line-height: 0;
      }

      .prompt {
        margin: 0;
        font-size: var(--eds-font-size-sm);
        color: var(--eds-color-text);
      }

      .prompt-subtle {
        margin: 0;
        font-size: var(--eds-font-size-xs);
        color: var(--eds-color-text-subtle);
      }

      .file-input {
        position: absolute;
        width: 0;
        height: 0;
        opacity: 0;
        pointer-events: none;
      }

      .file-list {
        margin: var(--eds-space-3) 0 0;
        padding: 0;
        list-style: none;
      }

      .file-item {
        display: flex;
        align-items: center;
        gap: var(--eds-space-2);
        padding: var(--eds-space-2) var(--eds-space-3);
        border: 1px solid var(--eds-color-border);
        border-radius: var(--eds-radius-md);
        background: var(--eds-color-ink-50);
        font-size: var(--eds-font-size-sm);
        color: var(--eds-color-text);
      }

      .file-item + .file-item {
        margin-top: var(--eds-space-2);
      }
    `,
  ];

  @property()
  label = '';

  @property()
  accept = '';

  @property({ type: Boolean, reflect: true })
  multiple = false;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property()
  hint = '';

  /** Dropzone icon name. */
  @property()
  icon: EdsIconName | '' = 'upload';

  @state()
  private dragOver = false;

  @state()
  private selectedFiles: File[] = [];

  private inputId = `eds-file-upload-${Math.random().toString(36).slice(2, 9)}`;

  @query('input[type="file"]')
  private fileInput?: HTMLInputElement;

  private openFileDialog() {
    if (this.disabled) {
      return;
    }
    this.fileInput?.click();
  }

  private handleDragOver(event: DragEvent) {
    event.preventDefault();
    if (this.disabled) {
      return;
    }
    this.dragOver = true;
  }

  private handleDragLeave() {
    this.dragOver = false;
  }

  private handleDrop(event: DragEvent) {
    event.preventDefault();
    this.dragOver = false;
    if (this.disabled) {
      return;
    }
    const files = Array.from(event.dataTransfer?.files ?? []);
    this.updateFiles(files);
  }

  private handleInputChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.updateFiles(Array.from(input.files ?? []));
  }

  private updateFiles(files: File[]) {
    const nextFiles = this.multiple ? files : files.slice(0, 1);
    this.selectedFiles = nextFiles;
    this.dispatchEvent(
      new CustomEvent<EdsFileUploadChangeDetail>('eds-change', {
        detail: { files: nextFiles },
        bubbles: true,
        composed: true,
      }),
    );
  }

  override render() {
    return html`
      <div class="field">
        ${this.label ? html`<label class="label" for=${this.inputId}>${this.label}</label>` : nothing}
        <div
          class="dropzone"
          role="button"
          tabindex=${this.disabled ? '-1' : '0'}
          aria-disabled=${this.disabled ? 'true' : 'false'}
          data-disabled=${this.disabled ? 'true' : 'false'}
          data-dragover=${this.dragOver ? 'true' : 'false'}
          @click=${this.openFileDialog}
          @keydown=${(event: KeyboardEvent) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault();
              this.openFileDialog();
            }
          }}
          @dragover=${this.handleDragOver}
          @dragleave=${this.handleDragLeave}
          @drop=${this.handleDrop}
        >
          <span class="icon"><eds-icon name=${this.icon || 'upload'} size="lg"></eds-icon></span>
          <p class="prompt">
            <strong>Click to upload</strong> or drag and drop
          </p>
          <p class="prompt-subtle">${this.multiple ? 'Multiple files supported' : 'Single file only'}</p>
        </div>
        <input
          id=${this.inputId}
          class="file-input"
          type="file"
          accept=${ifDefined(this.accept || undefined)}
          ?multiple=${this.multiple}
          ?disabled=${this.disabled}
          @change=${this.handleInputChange}
        />
        ${this.hint ? html`<span class="hint">${this.hint}</span>` : nothing}
        ${this.selectedFiles.length
          ? html`
              <ul class="file-list" aria-live="polite">
                ${this.selectedFiles.map(
                  (file) => html`
                    <li class="file-item">
                      <svg viewBox="0 0 16 16" width="14" height="14" fill="none" aria-hidden="true">
                        <path
                          d="M9 1.5H4.5C3.67157 1.5 3 2.17157 3 3V13C3 13.8284 3.67157 14.5 4.5 14.5H11.5C12.3284 14.5 13 13.8284 13 13V5.5L9 1.5Z"
                          stroke="currentColor"
                          stroke-width="1.25"
                        />
                        <path d="M9 1.5V5.5H13" stroke="currentColor" stroke-width="1.25" />
                      </svg>
                      ${file.name}
                    </li>
                  `,
                )}
              </ul>
            `
          : nothing}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'eds-file-upload': EdsFileUpload;
  }
}
