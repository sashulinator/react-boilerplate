export * from './widgets/board'
export { DepricatedItem, getItemMovement, type DepricatedItemProps } from './widgets/item-d'

export { PaintingPanel } from '~/abstract/canvas'
export type { PaintingPanelProps } from '~/abstract/canvas'

/**
 * widgets
 */
export { default as Edge, type EdgeProps } from './widgets/edge'

export {
  default as Item,
  Controller as ItemController,
  type Events as ItemEvents,
  type ControllerProps as ItemControllerProps,
  type ItemProps,
  type GestureDragEvent,
} from './widgets/item'
