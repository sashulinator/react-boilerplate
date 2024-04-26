import clr from 'color'

import type { Colors } from '../../types/colors'

const bg = clr('#e4e9ee')
const bgSM = bg.alpha(0.5)

export const colors = {
  Item_bg: bg,
  'Item_bg--hover': bg.lighten(0.02),
  'Item_bg--disabled': bg.lighten(0.04),
  'Item_bg--semitransparent': bgSM,
  'Item_bg--semitransparent--hover': bgSM.darken(0.05),
  'Item_bg--semitransparent--disabled': bgSM.alpha(0.3),
} satisfies Colors

export default colors
