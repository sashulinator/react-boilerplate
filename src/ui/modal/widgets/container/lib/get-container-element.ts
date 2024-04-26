import { displayName } from '../ui/container'

export function getContainerElement(): HTMLElement | null {
  const element = document.querySelector<HTMLElement>(`.${displayName}`)

  return element
}
