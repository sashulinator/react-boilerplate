import './status.scss'

import { c } from '~/utils/core'

import Notification, { Props as NotificationProps } from '../../../ui/notification'

export interface Props extends Omit<NotificationProps, 'children'> {
  className?: string | undefined
}

const displayName = 'ui-Notification-v-Status'

/**
 * Default
 */
export default function Component(props: Props): JSX.Element {
  return (
    <Notification {...props} className={c(displayName)}>
      <div className='content'>
        <div className='indicator' />
        <div className='value'>{props.notification.data.value}</div>
      </div>
    </Notification>
  )
}

Component.displayName = displayName
