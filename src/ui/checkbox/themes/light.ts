import LIGHT from 'themes/light'

import { lightTheme } from '~/ui/field'

import { CSSVars } from '../types/css-vars'
import { common } from './common'

export const light: CSSVars = {
  ...common,
  checkbox_bg: lightTheme.field_bg,
  checkbox_bg__focus: LIGHT.focus,
  checkbox_bg__hover: lightTheme.field_bg__hover,
  checkbox_bg__disabled: lightTheme.field_bg__disabled,
  checkbox_bg__error: lightTheme.field_bg__error,
  checkbox_bg__checked: LIGHT.primary,
  checkbox_color: '#fff',
  checkbox_color__disabled: 'black',
}
