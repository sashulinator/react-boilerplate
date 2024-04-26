import { FullGestureState } from '@use-gesture/react'

/**
 * @deprecated
 */
export type GestureDragEvent = Omit<FullGestureState<'drag'>, 'event'> & {
  event: PointerEvent | MouseEvent | TouchEvent | KeyboardEvent
}
