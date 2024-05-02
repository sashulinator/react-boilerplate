import { Codes } from '~/shared/localization'
import { notify } from '~/shared/notify'

import dayjs from '../dayjs'

export async function setLocale(languageCode: Codes): Promise<void> {
  if (languageCode === Codes.ru_RU) {
    try {
      await import('dayjs/locale/ru')
      dayjs.locale('ru')
    } catch (e) {
      notify({ type: 'error', data: 'Не удалось применить локализацию для дат' })
      console.error(e)
    }
  }

  if (languageCode === Codes.en_US) {
    try {
      await import('dayjs/locale/en')
      dayjs.locale('en')
    } catch (e) {
      notify({ type: 'error', data: 'Could not set a data localization' })
      console.error(e)
    }
  }

  if (languageCode === Codes.en_GB) {
    try {
      await import('dayjs/locale/en-ca')
      dayjs.locale('en')
    } catch (e) {
      notify({ type: 'error', data: 'Could not set a data localization' })
      console.error(e)
    }
  }
}
