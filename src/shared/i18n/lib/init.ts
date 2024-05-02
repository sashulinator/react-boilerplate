import { Codes } from '~/shared/localization'
import { notify } from '~/shared/notify'

import i18n from '../i18n'

export async function init(localization: Codes): Promise<void> {
  await i18n
    .init({
      lng: localization,
      fallbackLng: localization,
      ns: ['t'],
      backend: { loadPath: '/translations/{{lng}}/{{ns}}.json' },
    })
    .catch(() => {
      notify({ type: 'error', data: 'Could not set a localization' })
    })
}
