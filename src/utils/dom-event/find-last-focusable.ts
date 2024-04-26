import { focusableSelectors } from './constants/focusable-selectors'

export function findLastFocusable(htmlElement: HTMLElement): HTMLElement | null {
  const focusables = Array.from(htmlElement.querySelectorAll(focusableSelectors.join(', ')))
  return focusables.at(-1) as HTMLElement
}
