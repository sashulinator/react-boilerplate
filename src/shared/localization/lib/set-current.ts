import { setLocale as setDayJSLocale } from '../../dayjs'
import i18n from '../../i18n'
import { Codes } from '../constants/codes'
import { LOCAL_STORAGE_KEY } from '../constants/local-storage-key'

export async function setCurrent(localization: Codes): Promise<void> {
  void setDayJSLocale(localization)

  try {
    await i18n.changeLanguage(localization)
    localStorage.setItem(LOCAL_STORAGE_KEY, localization)
  } catch (e) {
    console.error('could not change localization', e)
  }
}
