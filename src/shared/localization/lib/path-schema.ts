import { isObject } from '~/utils/core'
import { setPath, walk } from '~/utils/dictionary'

import { Schema } from '../types/schema'

/**
 * Трансформирует структуру в схему.
 * Например:
 * "{ a: { b: '' }"
 * -->
 * "{ a: 'ns:a', { b: 'ns:a.b' } }"
 */

export function pathSchema<T extends Schema>(schema: T): T {
  let data = {}

  walk(schema.data, ({ value, path }) => {
    if (!isObject(value)) {
      const key = `${schema.namespace}:${path.join('.')}`
      data = setPath(path, key, data)
    }
  })

  return { ...schema, data }
}
