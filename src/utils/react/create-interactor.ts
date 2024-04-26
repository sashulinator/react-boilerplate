import { InteractionHandler, InteractionItemHandler } from './types/interact-handler'

/**
 * Очень удобно порой для взаимодействия использовать button
 * т.к. он при подписке на событие onClick отработает по клику и по нажатию Enter
 * но к сожалению не всегда есть возможность его использовать
 */
export function createInteractor<E extends Element = Element>(
  cb: InteractionHandler<E>,
  interactKey: string = 'Enter',
  tabIndex = 0
) {
  return {
    tabIndex,
    onClick: (e: React.MouseEvent<E>) => cb(e),
    onKeyDown: (e: React.KeyboardEvent<E>) => {
      if (e.key === interactKey) cb(e)
    },
  }
}

export function createItemInteractor<TItem, E extends Element = Element>(
  item: TItem,
  cb: InteractionItemHandler<TItem, E>,
  interactKey: string = 'Enter',
  tabIndex = 0
) {
  return {
    tabIndex,
    onClick: (e: React.MouseEvent<E>) => cb(e, item),
    onKeyDown: (e: React.KeyboardEvent<E>) => {
      if (e.key === interactKey) cb(e, item)
    },
  }
}
