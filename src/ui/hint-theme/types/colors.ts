import { Colors as AbstractColors } from '../../../abstract/button/theme/colors'
import { ToStringable } from '../../../utils/core'

export type Colors = AbstractColors & {
  'Hint_color--error': ToStringable
  'Hint-color--success': ToStringable
}
