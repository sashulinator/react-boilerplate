import shared from 'themes/dark'

import type { Colors } from '../../types/colors'

export const colors = {
  Item_bg: shared.bgSecondary,
  'Item_bg--hover': shared.bgSecondary.lighten(0.1),
  'Item_bg--disabled': shared.bgSecondary.lighten(0.4),
  'Item_bg--semitransparent': shared.bgSecondary.alpha(0.5),
  'Item_bg--semitransparent--hover': shared.bgSecondary.alpha(0.5).lighten(0.2),
  'Item_bg--semitransparent--disabled': shared.bgSecondary.alpha(0.3).lighten(0.4),
} satisfies Colors

export default colors
