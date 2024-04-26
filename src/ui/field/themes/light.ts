import clr from 'color'

import { RequiredVars } from '~/utils/theme'

import { Colors } from './types'

export default function getLightColors(light: RequiredVars): Colors {
  const field_bg = clr('#d0ddeb').alpha(0.4)

  return {
    'ui-Field_bg': field_bg,
    // hover
    'ui-Field_bg--hover': field_bg.alpha(0.5),
    // focus
    'ui-Field_bg--focus': field_bg.alpha(0),
    // error
    'ui-Field_bg--error': clr(light.errorColor).alpha(0.3),
    'ui-Field_bg--error--hover': clr(light.errorColor).alpha(0.25),
    'ui-Field_bg--error--focus': clr(light.errorColor).alpha(0.35),
    // disabled
    'ui-Field_bg--disabled': field_bg.alpha(0.03),
  }
}
