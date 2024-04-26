import { focusableSelectors } from './constants/focusable-selectors'

export function findNextFocusable(htmlElement: HTMLElement): HTMLElement | null {
  const all = htmlElement.querySelectorAll(focusableSelectors.join(', '))
  var index = Array.prototype.indexOf.call(all, htmlElement)
  return all.item(index + 1) as HTMLElement
}
