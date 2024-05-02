import { isString } from '~/utils/core'
import { walk } from '~/utils/dictionary'
import { BaseError } from '~/utils/error'

import { Schema } from '../types/schema'

/**
 * Проверяет что схема не содержит лишних ключей
 */
export function assertNoExcessiveKeys<TSchema extends Schema>(
  schema: TSchema,
  getTranslation: (key: string) => string | undefined
): asserts schema is TSchema {
  walk(schema.data, ({ value, path }) => {
    if (!isString(value)) return
    const key = path.join('.')

    const translation = getTranslation(key)

    if (translation) return

    throw new BaseError('Translation Schema has excessive keys.', {
      code: 'translationSchemaHasExcessiveKeys',
      path,
    })
  })
}
