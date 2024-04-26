import './list.scss'

import React, { ForwardedRef, forwardRef, useMemo, useRef } from 'react'

import List, { ItemProps as AItemProps, Controller } from '~/abstract/list'
import { Dictionary, Id, c } from '~/utils/core'
import { findNextFocusableSibling, stopPropagation } from '~/utils/dom-event'
import { fns } from '~/utils/function'
import { setRefs } from '~/utils/react'

export type ItemProps<TItem, P extends object> = AItemProps<TItem, P> & {
  focusProps: { onKeyDown: (e: React.KeyboardEvent<HTMLElement>) => void }
}

export interface Props<TItem, P extends Dictionary> extends React.HTMLAttributes<HTMLUListElement> {
  itemProps: P
  data: TItem[]
  controller?: Controller<TItem>
  getItemId: (item: TItem) => Id
  renderItem: (props: ItemProps<TItem, P>) => JSX.Element | null
}

const displayName = 'ui-List'

/**
 * List
 */
function Component<TItem, P extends Dictionary>(
  props: Props<TItem, P>,
  ref: ForwardedRef<HTMLUListElement>
): JSX.Element {
  const listRef = useRef<HTMLUListElement>(null)
  const { controller: propController, itemProps, data: list, getItemId, renderItem, ...listProps } = props

  const controller = useMemo(() => propController || new Controller(list, getItemId), [props.controller, list])

  const memoedItemProps = useMemo(
    () => ({
      ...itemProps,
      focusProps: {
        onKeyDown: handleItemKeyDown,
      },
    }),
    [itemProps]
  )

  return (
    <List
      {...listProps}
      className={c(props.className, displayName)}
      tabIndex={0}
      itemProps={memoedItemProps}
      renderItem={renderItem}
      ref={setRefs(ref, listRef)}
      getItemId={getItemId}
      controller={controller}
      onFocus={stopPropagation}
      onKeyDown={fns(listProps.onKeyDown, handleListKeyDown)}
      list={list}
    />
  )

  // Private

  function handleItemKeyDown(e: React.KeyboardEvent<HTMLElement>): void {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const id = e.currentTarget.dataset?.itemId as string
    if (id === undefined) throw Error('Set prop `data-item-id` to the list item element')

    let itemToFocus: undefined | TItem = undefined

    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      e.preventDefault()
      itemToFocus = controller.findNext(id)
    }
    if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      itemToFocus = controller.findPrevious(id)
      e.preventDefault()
    }
    if (itemToFocus === undefined) return

    const idToFocus = props.getItemId(itemToFocus)
    const htmlElement = listRef.current?.querySelector(`[data-item-id="${idToFocus}"]`) as HTMLElement
    htmlElement?.focus()
  }

  function handleListKeyDown(e: React.KeyboardEvent<HTMLUListElement>): void {
    if (e.key === 'Escape') {
      if (document.activeElement === listRef.current) return
      listRef.current?.focus()
      return
    }

    if (e.target !== e.currentTarget) return

    if (e.key === 'Enter') {
      const htmlElement = listRef.current?.querySelector(`[data-item-id]`) as HTMLElement
      htmlElement?.focus()
      return
    }
    if (e.key === 'Tab') {
      if (e.shiftKey) return
      e.preventDefault()
      findNextFocusableSibling(e.currentTarget)?.focus()
      return
    }
  }
}

Component.displayName = displayName

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
