import { Id } from '../core'
import { push } from '../list/push'
import { remove } from './remove'

export function toggle<T extends Id>(id: T, list: T[]): T[] {
  if (list.includes(id)) {
    return remove(id, list)
  } else {
    return push(id, list)
  }
}
