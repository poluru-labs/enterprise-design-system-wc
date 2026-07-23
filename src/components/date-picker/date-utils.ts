/**
 * Date helpers used by `eds-date-picker` / `eds-date-range-picker` and re-exported
 * from the package root for calendar UIs.
 * @module
 */

/**
 * Parse a `YYYY-MM-DD` string into a local `Date`, or `null` if invalid.
 *
 * @param iso - ISO calendar date string
 */
export function parseISODate(iso: string): Date | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!match) return null;

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const date = new Date(year, month - 1, day);

  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return null;
  }

  return date;
}

/**
 * Format a `Date` as a `YYYY-MM-DD` string (local calendar date).
 *
 * @param date - Date instance
 */
export function toISODate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Format an ISO date string for display using the locale short date style.
 *
 * @param iso - `YYYY-MM-DD` string
 * @returns Localized short date, or `''` if invalid
 */
export function formatDisplayDate(iso: string): string {
  const date = parseISODate(iso);
  if (!date) return '';
  return date.toLocaleDateString(undefined, { dateStyle: 'short' });
}

/**
 * Compare two ISO date strings lexicographically (`YYYY-MM-DD`).
 *
 * @returns Negative if `a < b`, `0` if equal, positive if `a > b`
 */
export function compareISODates(a: string, b: string): number {
  return a.localeCompare(b);
}

/**
 * Whether an ISO date falls within optional inclusive `min` / `max` bounds.
 *
 * @param iso - Candidate date
 * @param min - Optional minimum `YYYY-MM-DD`
 * @param max - Optional maximum `YYYY-MM-DD`
 */
export function isISODateInRange(iso: string, min?: string, max?: string): boolean {
  if (min && compareISODates(iso, min) < 0) return false;
  if (max && compareISODates(iso, max) > 0) return false;
  return true;
}

/** One cell in a month calendar grid. */
export interface CalendarDay {
  /** ISO date for the cell (`YYYY-MM-DD`). */
  iso: string;
  /** Day-of-month number shown in the cell. */
  day: number;
  /** `true` when the day belongs to the viewed month. */
  inMonth: boolean;
}

/**
 * Build a Sunday-start calendar grid for the given month (padded to full weeks).
 *
 * @param year - Full year (e.g. `2026`)
 * @param month - Zero-based month index (`0` = January)
 */
export function getCalendarDays(year: number, month: number): CalendarDay[] {
  const firstOfMonth = new Date(year, month, 1);
  const leading = firstOfMonth.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();
  const cells: CalendarDay[] = [];

  for (let index = leading - 1; index >= 0; index--) {
    const day = daysInPrevMonth - index;
    const date = new Date(year, month - 1, day);
    cells.push({ iso: toISODate(date), day, inMonth: false });
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    cells.push({ iso: toISODate(date), day, inMonth: true });
  }

  let nextDay = 1;
  while (cells.length % 7 !== 0) {
    const date = new Date(year, month + 1, nextDay);
    cells.push({ iso: toISODate(date), day: nextDay, inMonth: false });
    nextDay += 1;
  }

  return cells;
}

/**
 * Localized narrow weekday labels starting on Sunday.
 *
 * @returns Array of 7 narrow weekday strings for the active locale
 */
export function getWeekdayLabels(): string[] {
  const labels: string[] = [];
  const base = new Date(2025, 0, 5);

  for (let index = 0; index < 7; index++) {
    const date = new Date(base);
    date.setDate(base.getDate() + index);
    labels.push(date.toLocaleDateString(undefined, { weekday: 'narrow' }));
  }

  return labels;
}

/**
 * Month and year label for a calendar header.
 *
 * @param year - Full year
 * @param month - Zero-based month index
 */
export function formatMonthYear(year: number, month: number): string {
  return new Date(year, month, 1).toLocaleDateString(undefined, {
    month: 'long',
    year: 'numeric',
  });
}

/**
 * ISO `YYYY-MM-DD` string for today in local time.
 */
export function todayISO(): string {
  return toISODate(new Date());
}
