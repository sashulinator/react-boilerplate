import { Dictionary } from '../core'
import { Pick } from '../types/object'

export function pick<D extends Dictionary, K extends keyof D>(dict: D, ...keys: K[]): Pick<D, K> {
  return keys.reduce(
    (acc, key) => {
      acc[key] = dict[key] as any
      return acc
    },
    {} as Pick<D, K>
  )
}
