import clr from 'color'
import shared from 'themes/light'

import type { Colors } from '../../types/colors'

export const colors = {
  Modal_bg: clr('#000000').alpha(0.3),
  'Modal-content_bg': shared.bg,
} satisfies Colors

export default colors
