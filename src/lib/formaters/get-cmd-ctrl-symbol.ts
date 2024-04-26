import { isMac } from '~/utils/core'

export function getCmdCtrlSymbol(): string {
  return isMac() ? '⌘' : 'Ctrl'
}
