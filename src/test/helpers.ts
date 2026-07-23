import type { LitElement } from 'lit';

/** Clear the document body between tests. */
export function resetDom(): void {
  document.body.innerHTML = '';
}

/** Create, append, and await update of a Lit custom element. */
export async function mount<T extends LitElement>(
  tag: string,
  setup?: (el: T) => void,
): Promise<T> {
  const el = document.createElement(tag) as T;
  setup?.(el);
  document.body.appendChild(el);
  await el.updateComplete;
  // Allow slotted children / microtasks to settle
  await el.updateComplete;
  return el;
}

/** Wait for the next occurrence of a CustomEvent on a target. */
export function nextEvent<T = unknown>(
  target: EventTarget,
  type: string,
): Promise<CustomEvent<T>> {
  return new Promise((resolve) => {
    target.addEventListener(
      type,
      (event) => resolve(event as CustomEvent<T>),
      { once: true },
    );
  });
}

/** Query inside a component shadow root (throws if missing). */
export function shadowQuery<T extends Element>(
  el: LitElement,
  selector: string,
): T {
  const node = el.shadowRoot?.querySelector<T>(selector);
  if (!node) {
    throw new Error(`Selector not found in shadow root: ${selector}`);
  }
  return node;
}

/** Query all matching nodes in a component shadow root. */
export function shadowQueryAll<T extends Element>(
  el: LitElement,
  selector: string,
): T[] {
  return [...(el.shadowRoot?.querySelectorAll<T>(selector) ?? [])];
}
