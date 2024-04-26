import { Id } from '~/utils/core'

export interface Item {
  type: string
  redo: unknown
  undo: unknown
  historical: boolean
}

export interface Step<TItem extends Item = Item> {
  id: Id
  done: boolean
  username: string
  list: TItem[]
}
