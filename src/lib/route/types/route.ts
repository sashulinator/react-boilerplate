import { Any } from '~/utils/core'

export type Route = {
  path: string
  getName: () => string
  getURL: (...a: Any[]) => string
  renderMain: () => JSX.Element
  renderHeader?: () => JSX.Element
  renderNav?: () => JSX.Element
  renderIcon?: () => JSX.Element
  navigatable?: boolean | undefined

  /**
   * Полезно когда нужно сделать для страницы совершенно другой Layout
   */
  layoutModificator?: string | undefined
}
