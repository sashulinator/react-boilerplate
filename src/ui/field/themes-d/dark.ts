import clr from 'color'

import { DARK } from '~/shared/theme/dark'

import { common } from './common'
import { CSSVars } from './css-vars'

const field_bg = clr('white').alpha(0.1)

export const dark = {
  ...common,
  field_bg,
  field_outlineColor: DARK.outlineColor,
  // hover
  field_bg__hover: field_bg.alpha(0.12),
  // focus
  field_bg__focus: field_bg.alpha(0.14),
  field_bg__disabled: field_bg.alpha(0.03),
  // error
  field_bg__error: DARK.errorColor.alpha(0.3),
  field_bg__error__hover: DARK.errorColor.alpha(0.25),
  field_bg__error__focus: DARK.errorColor.alpha(0.35),
} satisfies CSSVars
