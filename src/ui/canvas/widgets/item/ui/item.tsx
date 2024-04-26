import { useDrag } from '@use-gesture/react'

import { ForwardedRef, forwardRef } from 'react'

import { c } from '~/utils/core'
import { fns } from '~/utils/function'
import { useUpdate } from '~/utils/hooks'

import { Controller, Events } from '../controller'
import { GestureDragEvent } from '../types/gesture-drag-event'

const displayName = 'ui-Canvas-w-Item'

export interface Props extends React.HTMLAttributes<HTMLDivElement> {
  onGestureDrag: (event: GestureDragEvent) => void
  controller: Controller<Events>
}

/**
 * Элемент Canvas с фичами
 * 1. onGestureDrag
 */
export function Component(props: Props, ref: ForwardedRef<HTMLDivElement>): JSX.Element {
  const { onGestureDrag, controller, ...canvasItemProps } = props

  useUpdate(subscribeToUpdates)

  const draggableProps = useDrag(onGestureDrag)()

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      {...canvasItemProps}
      // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
      tabIndex={0}
      ref={ref}
      data-id={controller.id}
      className={c(props.className, displayName)}
      style={{
        touchAction: 'none',
        transform: `translate(${props.controller.position.value.x}px, ${props.controller.position.value.y}px)`,
        ...canvasItemProps.style,
      }}
      onKeyDown={fns(draggableProps.onKeyDown, canvasItemProps.onKeyDown)}
      onKeyUp={fns(draggableProps.onKeyUp, canvasItemProps.onKeyUp)}
      onLostPointerCapture={fns(draggableProps.onLostPointerCapture, canvasItemProps.onLostPointerCapture)}
      onPointerCancel={fns(draggableProps.onPointerCancel, canvasItemProps.onPointerCancel)}
      onPointerDown={fns(draggableProps.onPointerDown, canvasItemProps.onPointerDown)}
      onPointerMove={fns(draggableProps.onPointerMove, canvasItemProps.onPointerMove)}
      onPointerUp={fns(draggableProps.onPointerUp, canvasItemProps.onPointerUp)}
    />
  )

  // Private

  function subscribeToUpdates(update: () => void, uns: (() => void)[]): void {
    uns.push(props.controller.on('position', update))
  }
}

const Item = forwardRef(Component)
Item.displayName = displayName
export default Item
