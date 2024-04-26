import { Dictionary } from '~/utils/core'

export type ErrorTree<T extends Dictionary> = {
  [K in keyof T]: { code: string }
}
