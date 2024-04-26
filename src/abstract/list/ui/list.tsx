import { ForwardedRef, createElement, forwardRef, useMemo } from 'react'

import { Dictionary, Id, c } from '~/utils/core'

import { Controller } from '../models/controller'

const displayName = 'a-List'

export type ItemProps<TItem, P extends object> = {
  item: TItem
  controller: Controller<TItem>
  index: number
  id: Id
} & P

export interface Props<TItem, P extends object> extends React.HTMLAttributes<HTMLUListElement> {
  itemProps: P
  list: TItem[]
  controller?: Controller<TItem>
  getItemId: (item: TItem) => Id
  renderItem: (props: ItemProps<TItem, P>) => JSX.Element | null
}

function Component<TItem, P extends object>(props: Props<TItem, P>, ref: ForwardedRef<HTMLUListElement>): JSX.Element {
  const { controller: propController, itemProps, list, getItemId, renderItem, ...listProps } = props

  const controller = useMemo(() => propController || new Controller(list, getItemId), [props.controller, list])

  const children = useMemo(() => {
    return list.map((item, index) => {
      const id = getItemId(item)
      return createElement(renderItem, { ...itemProps, controller, item, id, key: id, index })
    })
  }, [props.controller, list, itemProps])

  return (
    <ul ref={ref} {...listProps} style={{ ...listProps.style }} className={c(props.className, displayName)}>
      {children}
    </ul>
  )
}

// Генерик схлопывается при использовании forwardRef
// https://stackoverflow.com/questions/58469229/react-with-typescript-generics-while-using-react-forwardref
const ForwardRef = forwardRef(Component) as {
  <TItem, P extends Dictionary>(props: Props<TItem, P> & { ref?: ForwardedRef<HTMLUListElement> }): JSX.Element
  displayName: string
  // explicit rejected with `never` required due to
  // https://github.com/microsoft/TypeScript/issues/36826
  /**
   * defaultProps are not supported on render functions
   */
  // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
  defaultProps?: never | undefined
  /**
   * propTypes are not supported on render functions
   */
  // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
  propTypes?: never | undefined
}
ForwardRef.displayName = displayName
export default ForwardRef
