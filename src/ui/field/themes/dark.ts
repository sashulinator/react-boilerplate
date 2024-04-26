import clr from 'color'

import { RequiredVars } from '~/utils/theme'

import { Colors } from './types'

export default function getDarkColors(colors: RequiredVars): Colors {
  const field_bg = clr(colors.bg).darken(0.2)

  return {
    'ui-Field_bg': field_bg,
    // hover
    'ui-Field_bg--hover': 'transparent',
    // focus
    'ui-Field_bg--focus': 'transparent',
    // error
    'ui-Field_bg--error': clr(colors.errorColor).alpha(0.3),
    'ui-Field_bg--error--hover': clr(colors.errorColor).alpha(0.25),
    'ui-Field_bg--error--focus': clr(colors.errorColor).alpha(0.35),
    // disabled
    'ui-Field_bg--disabled': field_bg.alpha(0.03),
  }
}
