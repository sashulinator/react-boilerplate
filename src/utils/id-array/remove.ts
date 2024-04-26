import { Id } from '../core'
import { remove as removeIndex } from '../list'

export function remove<T extends Id>(id: T, arr: T[]): T[] {
  const index = arr.findIndex((iId) => iId === id)
  return removeIndex(index, arr)
}
