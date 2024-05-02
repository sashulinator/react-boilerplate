import { useEffect } from 'react'
import { useTranslation as useI18nTranslation } from 'react-i18next'

import { notifyDevError } from '~/lib/error/notify-dev-error'
import i18n from '~/shared/i18n/i18n'
import { isDev } from '~/utils/core'

import { assertNoExcessiveKeys } from '../assertions/has-no-excessive-keys'
import { $RecursiveKeyOf } from '../types/$recursive-key-of'
import { Schema } from '../types/schema'

/**
 * Keys:
 * {
 *   "friend_male_one": "A boyfriend",
 *   "friend_female_one": "A girlfriend",
 *   "friend_male_other": "{{count}} boyfriends",
 *   "friend_female_other": "{{count}} girlfriends"
 * }
 * Sample:
 * i18next.t('friend', {context: 'male', count: 1}); // -> "A boyfriend"
 * i18next.t('friend', {context: 'female', count: 1}); // -> "A girlfriend"
 * i18next.t('friend', {context: 'male', count: 100}); // -> "100 boyfriends"
 * i18next.t('friend', {context: 'female', count: 100}); // -> "100 girlfriends"
 **/
export type TOptions = {
  context?: unknown
} & { [key: string]: string | number | undefined }

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
