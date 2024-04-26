import { focusableSelectors } from './constants/focusable-selectors'

export function findNextFocusableSibling(htmlElement: HTMLElement): HTMLElement | null {
  const all = document.querySelectorAll(focusableSelectors.join(', '))
  const filtered = Array.prototype.filter.call(all, (el) => !htmlElement.contains(el) || htmlElement === el)
  const index = filtered.indexOf(htmlElement)
  return filtered.at(index === filtered.length - 1 ? 0 : index + 1) as HTMLElement
}
