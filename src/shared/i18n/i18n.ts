import { createInstance } from 'i18next'
import HttpApi from 'i18next-http-backend'
import { initReactI18next } from 'react-i18next'

const i18n = createInstance().use(initReactI18next).use(HttpApi)

export default i18n
