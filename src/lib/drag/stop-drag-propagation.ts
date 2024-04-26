import { stopPropagation } from '~/utils/dom-event'

export const stopDragPropagation = {
  onKeyDown: stopPropagation,
  onKeyUp: stopPropagation,
  onLostPointerCapture: stopPropagation,
  onPointerCancel: stopPropagation,
  onPointerDown: stopPropagation,
  onPointerMove: stopPropagation,
  onPointerUp: stopPropagation,
}
