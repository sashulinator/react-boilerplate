import { useEffect } from 'react'
import { useTranslation as useI18nTranslation } from 'react-i18next'

import { notifyDevError } from '~/lib/error/notify-dev-error'
import i18n from '~/shared/i18n/i18n'
import { isDev } from '~/utils/core'

import { assertNoExcessiveKeys } from '../assertions/has-no-excessive-keys'
import { $RecursiveKeyOf } from '../types/$recursive-key-of'
import { Schema } from '../types/schema'

export type TOptions = {
  context?: unknown
}

/**
 * Адаптер хук для библиотеки по переводам
 */
export function useTranslation<TSchema extends Schema>(
  schema: TSchema
): { t: (key: $RecursiveKeyOf<TSchema['data']>, options?: TOptions | undefined) => string } {
  const { t, ready } = useI18nTranslation([schema.namespace], { i18n })

  useEffect(_validate, [ready])

  return { t }

  /**
   * Private
   */

  function _validate(): void {
    if (!isDev() || !ready) return
    try {
      assertNoExcessiveKeys(schema, (key) => t(`${schema.namespace}:${key}`, ''))
    } catch (e) {
      notifyDevError(e)
    }
  }
}
