/**
 * ui
 */
import { default as Notification } from './ui/notification'

export default Notification
export type { Props as NotificationProps } from './ui/notification'

/**
 * variants
 */
export { type DefaultProps, default as StatusNotification } from './variants/status'
export { type ListProps as NotificationListProps, default as NotificationList } from './variants/list'
