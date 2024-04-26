import DARK from 'themes/dark'

import { darkTheme } from '~/ui/field'

import { CSSVars } from '../types/css-vars'
import { common } from './common'

export const dark: CSSVars = {
  ...common,
  checkbox_bg: darkTheme.field_bg,
  checkbox_bg__focus: DARK.focus,
  checkbox_bg__hover: darkTheme.field_bg__hover,
  checkbox_bg__disabled: darkTheme.field_bg__disabled,
  checkbox_bg__error: darkTheme.field_bg__error,
  checkbox_bg__checked: DARK.primary,
  checkbox_color__disabled: '#fff',
  checkbox_color: '#fff',
}
