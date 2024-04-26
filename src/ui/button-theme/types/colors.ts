import { Colors as AbstractColors } from '../../../abstract/button/theme/colors'
import { ToStringable } from '../../../utils/core'

export type Colors = AbstractColors & {
  'Button_bg--hovered': ToStringable
  'Button_bg--active': ToStringable
  Button_outlineColor: ToStringable

  // regular
  'Button_color--regular': ToStringable
  'Button_bg--regular': ToStringable
  'Button_bg--regular--active': ToStringable
  'Button_bg--regular--hover': ToStringable

  // primary
  'Button_bg--primary': ToStringable
  'Button_color--primary': ToStringable
  'Button_bg--primary--hover': ToStringable
  'Button_bg--primary--active': ToStringable
  'Button_bg--primary--disabled': ToStringable

  // tooltip
  'Button_bg--tooltip': ToStringable
  'Button_color--tooltip': ToStringable
  'Button_bg--tooltip--hover': ToStringable
  'Button_bg--tooltip--active': ToStringable
  'Button_bg--tooltip--disabled': ToStringable

  // ghost
  'Button_color--ghost': ToStringable
  'Button_bg--ghost--active': ToStringable
  'Button_bg--ghost--hover': ToStringable
}
