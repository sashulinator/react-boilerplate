import './item.scss'

import { createElement } from 'react'

import Flex from '~/abstract/flex'
import { AppearFrom } from '~/ui/animation'
import Button from '~/ui/button'
import { Close, Copy, Edit, Trash } from '~/ui/icon'
import Tooltip from '~/ui/tooltip/ui/tooltip'
import { c, isDev } from '~/utils/core'
import { keyListener, stopPropagation } from '~/utils/dom-event'
import { fns } from '~/utils/function'

Item.displayName = 'ui-Registry-w-Item'

export interface Props<T> {
  className?: string
  item: T
  disabled?: boolean | undefined
  index: number
  children: React.ReactNode
  renderButtons?: ((props: { item: T }) => JSX.Element) | undefined
  onTrashClick?: ((e: React.MouseEvent<HTMLButtonElement>, item: T, index: number) => void) | undefined
  onCloseClick?: ((e: React.MouseEvent<HTMLButtonElement>, item: T, index: number) => void) | undefined
  onCopyClick?: ((e: React.MouseEvent<HTMLButtonElement>, item: T, index: number) => void) | undefined
  onEditClick?: ((e: React.MouseEvent<HTMLButtonElement>, item: T, index: number) => void) | undefined
  onItemClick?:
    | ((e: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>, item: T, index: number) => void)
    | undefined
}

export default function Item<T>(props: Props<T>): JSX.Element {
  return (
    <AppearFrom
      tabIndex={props.disabled ? undefined : props.onItemClick ? 0 : undefined}
      onClick={(e): void =>
        props.disabled
          ? undefined
          : !window.getSelection()?.isCollapsed
          ? undefined
          : props.onItemClick?.(e, props.item, props.index)
      }
      onKeyDown={keyListener({ key: 'Enter' }, (e) => props.onItemClick?.(e, props.item, props.index))}
      className={c(props.className, Item.displayName)}
      from={{ y: 10 }}
      delay={props.index * 30}
    >
      <Flex className='content' width='100%' padding='0 var(--m) 0 0 '>
        {props.children}
      </Flex>
      <div className='actions'>
        {props.renderButtons && createElement(props.renderButtons, { item: props.item })}
        {props.onCopyClick && (
          <Tooltip contents='Копировать' placement='tr'>
            <Button
              variant='ghost'
              round={true}
              onClick={fns<[React.MouseEvent<HTMLButtonElement>]>(
                (e): void => props.onCopyClick?.(e, props.item, props.index),
                stopPropagation
              )}
            >
              <Copy />
            </Button>
          </Tooltip>
        )}
        {props.onEditClick && (
          <Tooltip contents='Редактировать' placement='tr'>
            <Button
              variant='ghost'
              round={true}
              onClick={fns<[React.MouseEvent<HTMLButtonElement>]>(
                (e): void => props.onEditClick?.(e, props.item, props.index),
                stopPropagation
              )}
            >
              <Edit />
            </Button>
          </Tooltip>
        )}
        {props.onTrashClick && isDev() && (
          <Tooltip contents='Удалить' placement='tr'>
            <Button
              variant='ghost'
              round={true}
              onClick={fns<[React.MouseEvent<HTMLButtonElement>]>(
                (e): void => props.onTrashClick?.(e, props.item, props.index),
                stopPropagation
              )}
            >
              <Trash />
            </Button>
          </Tooltip>
        )}

        {props.onCloseClick && (
          <Tooltip contents='Убрать' placement='tr'>
            <Button
              variant='ghost'
              round={true}
              onClick={fns<[React.MouseEvent<HTMLButtonElement>]>(
                (e): void => props.onCloseClick?.(e, props.item, props.index),
                stopPropagation
              )}
            >
              <Close />
            </Button>
          </Tooltip>
        )}
      </div>
    </AppearFrom>
  )
}
