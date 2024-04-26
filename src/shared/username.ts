import { CURRENT_USER } from '~/constants/local-storage'

export const username = new Date().toString()

export function getUsername(): string {
  return localStorage.getItem(CURRENT_USER) || ''
}
