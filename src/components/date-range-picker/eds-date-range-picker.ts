import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { hostBase, fieldStyles } from '../../foundations/shared.js';
import {
  compareISODates,
  formatDisplayDate,
  formatMonthYear,
  getCalendarDays,
  getWeekdayLabels,
  isISODateInRange,
  parseISODate,
  todayISO,
  toISODate,
} from '../date-picker/date-utils.js';

/**
 * Date range picker with two-step calendar selection.
 *
 * @fires eds-change - Fired when both start and end dates are selected. Detail: `{ start: string, end: string }`.
 *
 * @element eds-date-range-picker
 */
@customElement('eds-date-range-picker')
export class EdsDateRangePicker extends LitElement {
  static override styles = [
    hostBase,
    fieldStyles,
    css`
      :host {
        display: block;
        width: 100%;
        position: relative;
      }

      .trigger {
        position: relative;
        cursor: pointer;
      }

      .trigger[aria-disabled='true'] {
        cursor: not-allowed;
      }

      .input {
        flex: 1;
        min-width: 0;
        border: 0;
        padding: 0;
        margin: 0;
        background: transparent;
        color: inherit;
        font: inherit;
        outline: none;
        cursor: inherit;
      }

      .input::placeholder {
        color: var(--eds-color-text-subtle);
      }

      .input:disabled {
        cursor: not-allowed;
      }

      .icon-button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        width: 1.75rem;
        height: 1.75rem;
        margin: 0;
        padding: 0;
        border: 0;
        border-radius: var(--eds-radius-sm);
        background: transparent;
        color: var(--eds-color-text-muted);
        cursor: pointer;
        transition:
          background-color var(--eds-duration-fast) var(--eds-easing-standard),
          color var(--eds-duration-fast) var(--eds-easing-standard);
      }

      .icon-button:hover:not(:disabled) {
        background: var(--eds-color-ink-100);
        color: var(--eds-color-text);
      }

      .icon-button:focus-visible {
        outline: none;
        box-shadow: var(--eds-shadow-focus);
      }

      .icon-button:disabled {
        cursor: not-allowed;
        opacity: 0.55;
      }

      .popover {
        position: absolute;
        top: calc(100% + var(--eds-space-1));
        left: 0;
        z-index: 200;
        min-width: 17.5rem;
        padding: var(--eds-space-3);
        background: var(--eds-color-surface);
        border: 1px solid var(--eds-color-border);
        border-radius: var(--eds-radius-lg);
        box-shadow: var(--eds-shadow-md);
      }

      .calendar-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: var(--eds-space-2);
        margin-bottom: var(--eds-space-3);
      }

      .month-label {
        flex: 1;
        text-align: center;
        font-size: var(--eds-font-size-sm);
        font-weight: var(--eds-font-weight-semibold);
        color: var(--eds-color-text);
      }

      .nav-button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 2rem;
        height: 2rem;
        margin: 0;
        padding: 0;
        border: 0;
        border-radius: var(--eds-radius-md);
        background: transparent;
        color: var(--eds-color-text-muted);
        cursor: pointer;
        transition:
          background-color var(--eds-duration-fast) var(--eds-easing-standard),
          color var(--eds-duration-fast) var(--eds-easing-standard);
      }

      .nav-button:hover:not(:disabled) {
        background: var(--eds-color-ink-100);
        color: var(--eds-color-text);
      }

      .nav-button:focus-visible {
        outline: none;
        box-shadow: var(--eds-shadow-focus);
      }

      .nav-button:disabled {
        opacity: 0.35;
        cursor: not-allowed;
      }

      .weekdays,
      .days {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        gap: var(--eds-space-1);
      }

      .weekday {
        display: grid;
        place-items: center;
        height: 1.75rem;
        font-size: var(--eds-font-size-xs);
        font-weight: var(--eds-font-weight-semibold);
        color: var(--eds-color-text-subtle);
      }

      .day {
        display: grid;
        place-items: center;
        width: 100%;
        aspect-ratio: 1;
        margin: 0;
        padding: 0;
        border: 0;
        border-radius: var(--eds-radius-md);
        background: transparent;
        color: var(--eds-color-text);
        font: inherit;
        font-size: var(--eds-font-size-sm);
        cursor: pointer;
        transition:
          background-color var(--eds-duration-fast) var(--eds-easing-standard),
          color var(--eds-duration-fast) var(--eds-easing-standard);
      }

      .day:hover:not(:disabled) {
        background: var(--eds-color-brand-50);
      }

      .day:focus-visible {
        outline: none;
        box-shadow: var(--eds-shadow-focus);
      }

      .day[data-outside='true'] {
        color: var(--eds-color-text-subtle);
      }

      .day[data-today='true']:not([data-endpoint='true']) {
        box-shadow: inset 0 0 0 1px var(--eds-color-primary);
      }

      .day[data-in-range='true'] {
        background: var(--eds-color-brand-50);
        border-radius: 0;
      }

      .day[data-endpoint='true'] {
        background: var(--eds-color-primary);
        color: var(--eds-color-text-inverse);
      }

      .day[data-range-start='true'] {
        border-top-left-radius: var(--eds-radius-md);
        border-bottom-left-radius: var(--eds-radius-md);
      }

      .day[data-range-end='true'] {
        border-top-right-radius: var(--eds-radius-md);
        border-bottom-right-radius: var(--eds-radius-md);
      }

      .day:disabled {
        opacity: 0.35;
        cursor: not-allowed;
      }
    `,
  ];

  @property()
  label = '';

  @property({ attribute: 'start-value' })
  startValue = '';

  @property({ attribute: 'end-value' })
  endValue = '';

  @property()
  min = '';

  @property()
  max = '';

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @query('.input')
  private input!: HTMLInputElement;

  @state()
  private open = false;

  @state()
  private viewYear = new Date().getFullYear();

  @state()
  private viewMonth = new Date().getMonth();

  @state()
  private selectingEnd = false;

  @state()
  private hoverDate = '';

  private readonly fieldId = `eds-date-range-picker-${Math.random().toString(36).slice(2, 9)}`;

  private boundDocumentKeyDown = (event: KeyboardEvent) => this.onDocumentKeyDown(event);
  private boundDocumentPointerDown = (event: PointerEvent) => this.onDocumentPointerDown(event);

  override connectedCallback() {
    super.connectedCallback();
    document.addEventListener('keydown', this.boundDocumentKeyDown);
    document.addEventListener('pointerdown', this.boundDocumentPointerDown);
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('keydown', this.boundDocumentKeyDown);
    document.removeEventListener('pointerdown', this.boundDocumentPointerDown);
  }

  override updated(changed: Map<string, unknown>) {
    if (changed.has('startValue') && this.startValue) {
      const parsed = parseISODate(this.startValue);
      if (parsed) {
        this.viewYear = parsed.getFullYear();
        this.viewMonth = parsed.getMonth();
      }
    }
  }

  private get displayValue(): string {
    const start = this.startValue ? formatDisplayDate(this.startValue) : '';
    const end = this.endValue ? formatDisplayDate(this.endValue) : '';

    if (start && end) return `${start} – ${end}`;
    if (start && this.selectingEnd) return `${start} –`;
    if (start) return start;
    return '';
  }

  private syncViewToSelection() {
    const parsed = parseISODate(this.startValue) ?? parseISODate(this.endValue);
    if (parsed) {
      this.viewYear = parsed.getFullYear();
      this.viewMonth = parsed.getMonth();
      return;
    }

    const today = new Date();
    this.viewYear = today.getFullYear();
    this.viewMonth = today.getMonth();
  }

  private openPopover() {
    if (this.disabled) return;
    this.syncViewToSelection();
    this.selectingEnd = Boolean(this.startValue && !this.endValue);
    this.hoverDate = '';
    this.open = true;
  }

  private closePopover() {
    this.open = false;
    this.hoverDate = '';
  }

  private onDocumentKeyDown(event: KeyboardEvent) {
    if (event.key === 'Escape' && this.open) {
      event.preventDefault();
      event.stopPropagation();
      this.closePopover();
      this.input?.focus();
    }
  }

  private onDocumentPointerDown(event: PointerEvent) {
    if (!this.open) return;
    const path = event.composedPath();
    if (!path.includes(this)) {
      this.closePopover();
    }
  }

  private canNavigateToMonth(year: number, month: number): boolean {
    const first = toISODate(new Date(year, month, 1));
    const last = toISODate(new Date(year, month + 1, 0));
    if (this.min && compareISODates(last, this.min) < 0) return false;
    if (this.max && compareISODates(first, this.max) > 0) return false;
    return true;
  }

  private goToPreviousMonth() {
    const date = new Date(this.viewYear, this.viewMonth - 1, 1);
    if (!this.canNavigateToMonth(date.getFullYear(), date.getMonth())) return;
    this.viewYear = date.getFullYear();
    this.viewMonth = date.getMonth();
  }

  private goToNextMonth() {
    const date = new Date(this.viewYear, this.viewMonth + 1, 1);
    if (!this.canNavigateToMonth(date.getFullYear(), date.getMonth())) return;
    this.viewYear = date.getFullYear();
    this.viewMonth = date.getMonth();
  }

  private getPreviewRange(): { start: string; end: string } | null {
    if (this.startValue && this.endValue) {
      return { start: this.startValue, end: this.endValue };
    }

    if (this.selectingEnd && this.startValue && this.hoverDate) {
      const start =
        compareISODates(this.startValue, this.hoverDate) <= 0
          ? this.startValue
          : this.hoverDate;
      const end =
        compareISODates(this.startValue, this.hoverDate) <= 0
          ? this.hoverDate
          : this.startValue;
      return { start, end };
    }

    if (this.startValue && this.selectingEnd) {
      return { start: this.startValue, end: this.startValue };
    }

    return null;
  }

  private getDayState(iso: string) {
    const range = this.getPreviewRange();
    if (!range) {
      return {
        inRange: false,
        endpoint: false,
        rangeStart: false,
        rangeEnd: false,
      };
    }

    const inRange =
      compareISODates(iso, range.start) >= 0 && compareISODates(iso, range.end) <= 0;
    const endpoint = iso === range.start || iso === range.end;

    return {
      inRange,
      endpoint,
      rangeStart: iso === range.start,
      rangeEnd: iso === range.end,
    };
  }

  private selectDate(iso: string) {
    if (!isISODateInRange(iso, this.min || undefined, this.max || undefined)) return;

    if (!this.selectingEnd) {
      this.startValue = iso;
      this.endValue = '';
      this.selectingEnd = true;
      this.hoverDate = '';
      return;
    }

    let start = this.startValue;
    let end = iso;
    if (compareISODates(start, end) > 0) {
      [start, end] = [end, start];
    }

    this.startValue = start;
    this.endValue = end;
    this.selectingEnd = false;
    this.hoverDate = '';

    this.dispatchEvent(
      new CustomEvent('eds-change', {
        detail: { start, end },
        bubbles: true,
        composed: true,
      }),
    );
    this.closePopover();
    this.input?.focus();
  }

  private onInputClick() {
    this.openPopover();
  }

  private onCalendarButtonClick(event: Event) {
    event.stopPropagation();
    if (this.open) {
      this.closePopover();
    } else {
      this.openPopover();
    }
    this.input?.focus();
  }

  private renderCalendar() {
    const days = getCalendarDays(this.viewYear, this.viewMonth);
    const weekdays = getWeekdayLabels();
    const today = todayISO();
    const prevDisabled = !this.canNavigateToMonth(
      this.viewMonth === 0 ? this.viewYear - 1 : this.viewYear,
      this.viewMonth === 0 ? 11 : this.viewMonth - 1,
    );
    const nextDisabled = !this.canNavigateToMonth(
      this.viewMonth === 11 ? this.viewYear + 1 : this.viewYear,
      this.viewMonth === 11 ? 0 : this.viewMonth + 1,
    );

    return html`
      <div
        class="popover"
        role="dialog"
        aria-label="Choose date range"
        @pointerdown=${(event: Event) => event.stopPropagation()}
      >
        <div class="calendar-header">
          <button
            class="nav-button"
            type="button"
            aria-label="Previous month"
            ?disabled=${prevDisabled}
            @click=${this.goToPreviousMonth}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M10 3L5 8L10 13" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          <div class="month-label">${formatMonthYear(this.viewYear, this.viewMonth)}</div>
          <button
            class="nav-button"
            type="button"
            aria-label="Next month"
            ?disabled=${nextDisabled}
            @click=${this.goToNextMonth}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M6 3L11 8L6 13" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>

        <div class="weekdays" aria-hidden="true">
          ${weekdays.map(
            (weekday) => html`<span class="weekday">${weekday}</span>`,
          )}
        </div>

        <div class="days" role="grid" aria-label=${formatMonthYear(this.viewYear, this.viewMonth)}>
          ${days.map((cell) => {
            const disabled = !isISODateInRange(
              cell.iso,
              this.min || undefined,
              this.max || undefined,
            );
            const state = this.getDayState(cell.iso);

            return html`
              <button
                class="day"
                type="button"
                role="gridcell"
                aria-selected=${state.endpoint ? 'true' : 'false'}
                aria-label=${formatDisplayDate(cell.iso)}
                data-outside=${cell.inMonth ? 'false' : 'true'}
                data-today=${cell.iso === today ? 'true' : 'false'}
                data-in-range=${state.inRange ? 'true' : 'false'}
                data-endpoint=${state.endpoint ? 'true' : 'false'}
                data-range-start=${state.rangeStart ? 'true' : 'false'}
                data-range-end=${state.rangeEnd ? 'true' : 'false'}
                ?disabled=${disabled}
                @click=${() => this.selectDate(cell.iso)}
                @pointerenter=${() => {
                  if (this.selectingEnd) this.hoverDate = cell.iso;
                }}
              >
                ${cell.day}
              </button>
            `;
          })}
        </div>
      </div>
    `;
  }

  override render() {
    return html`
      <div class="field">
        ${this.label
          ? html`<label class="label" for=${this.fieldId}>${this.label}</label>`
          : nothing}

        <div
          class="control trigger"
          aria-disabled=${this.disabled ? 'true' : 'false'}
        >
          <input
            class="input"
            id=${this.fieldId}
            type="text"
            .value=${this.displayValue}
            placeholder="Select date range"
            readonly
            ?disabled=${this.disabled}
            aria-haspopup="dialog"
            aria-expanded=${this.open ? 'true' : 'false'}
            @click=${this.onInputClick}
            @keydown=${(event: KeyboardEvent) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                this.openPopover();
              }
            }}
          />
          <button
            class="icon-button"
            type="button"
            aria-label="Open calendar"
            ?disabled=${this.disabled}
            @click=${this.onCalendarButtonClick}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M4.5 2.5V4M11.5 2.5V4M3 6.5H13M4 3.5H12C12.5523 3.5 13 3.94772 13 4.5V12.5C13 13.0523 12.5523 13.5 12 13.5H4C3.44772 13.5 3 13.0523 3 12.5V4.5C3 3.94772 3.44772 3.5 4 3.5Z"
                stroke="currentColor"
                stroke-width="1.25"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>

        ${this.open ? this.renderCalendar() : nothing}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'eds-date-range-picker': EdsDateRangePicker;
  }
}
