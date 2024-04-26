import { focusableSelectors } from './constants/focusable-selectors'

export function findFirstFocusable(htmlElement: HTMLElement): HTMLElement | null {
  return htmlElement.querySelector(focusableSelectors.join(', '))
}
