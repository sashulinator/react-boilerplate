import { setLocale as setDateJSLocale } from '~/shared/dayjs'

import { init as initI18n } from '../../i18n'
import { getCurrent } from './get-current'

export async function init(): Promise<void> {
  const localization = getCurrent()

  await setDateJSLocale(localization)

  await initI18n(localization)
}
