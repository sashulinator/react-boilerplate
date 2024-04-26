export type InteractionHandler<E extends Element = Element> = (e: React.MouseEvent<E> | React.KeyboardEvent<E>) => void

/**
 * Очень удобно порой для взаимодействия использовать button
 * т.к. он при подписке на событие onClick отработает по клику и по нажатию Enter
 * но к сожалению не всегда есть возможность его использовать
 */
export type InteractionItemHandler<TItem, E extends Element = Element> = (
  e: React.MouseEvent<E> | React.KeyboardEvent<E>,
  item: TItem
) => void
