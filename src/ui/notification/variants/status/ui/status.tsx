import './status.scss'

import { c } from '~/utils/core'

import Notification, { Props as NotificationProps } from '../../../ui/notification'

export interface Props extends Omit<NotificationProps, 'children'> {
  className?: string | undefined
}

const displayName = 'ui-Notification-v-Default'

/**
 * Default
 */
export default function Component(props: Props): JSX.Element {
  const divChildren =
    typeof props.notification.data.value === 'string'
      ? { dangerouslySetInnerHTML: { __html: props.notification.data.value } }
      : { children: props.notification.data.value }

  return (
    <Notification {...props} className={c(displayName)}>
      <div className='content'>
        <div className='indicator' />
        <div {...(divChildren as any)} />
      </div>
    </Notification>
  )
}

Component.displayName = displayName
