import { LANGUAGE } from '~/constants/local-storage'

export function getCurrentLanguage(defaultLanguage: string): string {
  return localStorage.getItem(LANGUAGE) || defaultLanguage
}
