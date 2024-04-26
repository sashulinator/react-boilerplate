import React, { useEffect, useState } from 'react'

import Flex from '~/abstract/flex'
import { Id, SetterOrUpdater, c } from '~/utils/core'

import Item from '../widgets/item/ui/item'

Registry.displayName = 'ui-Registry'

export interface Props<T> {
  className?: string
  list: T[]
  searchQuery?: string | undefined
  picked?: Id[] | undefined
  getId: (item: T) => Id
  // onClicks
  onCloseClick?: ((e: React.MouseEvent<HTMLButtonElement>, item: T, index: number) => void) | undefined
  onRemoveClick?: ((e: React.MouseEvent<HTMLButtonElement>, item: T, index: number) => void) | undefined
  onCopyClick?: ((e: React.MouseEvent<HTMLButtonElement>, item: T, index: number) => void) | undefined
  onEditClick?: ((e: React.MouseEvent<HTMLButtonElement>, item: T, index: number) => void) | undefined
  onItemClick?:
    | ((e: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>, item: T, index: number) => void)
    | undefined
  // renders
  renderButtons?: ((props: { item: T }) => JSX.Element) | undefined
  renderItemContent:
    | ((props: { item: T; picked?: Id[] | undefined }) => React.ReactNode)
    | ((props: {
        item: T
        picked?: Id[] | undefined
        collapsed: boolean
        setCollapsed: SetterOrUpdater<boolean>
        index: number
        searchQuery?: string | undefined
      }) => React.ReactNode)
  renderTreeChildren?: (props: {
    item: T
    picked?: Id[] | undefined
    index: number
    collapsed: boolean
    setCollapsed: SetterOrUpdater<boolean>
    searchQuery?: string | undefined
  }) => React.ReactNode
}

export default function Registry<T>(props: Props<T>): JSX.Element {
  return (
    <Flex dir='column' gap='m' width='100%' className={c(props.className, Registry.displayName)}>
      {/* eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-explicit-any */}
      {props.list.map((item, i) =>
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-explicit-any
        React.createElement(renderItem, {
          ...props,
          item,
          i,
          key: props.getId(item),
          searchQuery: props.searchQuery,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any)
      )}
    </Flex>
  )
}

function renderItem<T>(props: Props<T> & { item: T; i: number }): JSX.Element {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [collapsed, setCollapsed] = useState(true)

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    setCollapsed(!props.searchQuery)
  }, [props.searchQuery])

  return (
    <>
      <Item
        item={props.item}
        index={props.i}
        onCopyClick={props.onCopyClick}
        onEditClick={props.onEditClick}
        onTrashClick={props.onRemoveClick}
        onCloseClick={props.onCloseClick}
        onItemClick={props.onItemClick}
        renderButtons={props.renderButtons}
      >
        {React.createElement(props.renderItemContent, {
          picked: props.picked,
          item: props.item,
          index: props.i,
          collapsed,
          setCollapsed,
          searchQuery: props.searchQuery,
        })}
      </Item>
      {props.renderTreeChildren && !collapsed && (
        <Flex dir='column' padding='0 0 0 var(--xxxl)' width='100%'>
          {React.createElement(props.renderTreeChildren, {
            picked: props.picked,
            item: props.item,
            index: props.i,
            collapsed,
            setCollapsed,
            searchQuery: props.searchQuery,
          })}
        </Flex>
      )}
    </>
  )
}
