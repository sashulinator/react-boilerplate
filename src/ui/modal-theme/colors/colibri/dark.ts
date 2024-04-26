import shared from 'themes/dark'

import type { Colors } from '../../types/colors'

export const colors = {
  Modal_bg: shared.bgSecondary.alpha(0.3),
  'Modal-content_bg': shared.bg,
} satisfies Colors

export default colors
