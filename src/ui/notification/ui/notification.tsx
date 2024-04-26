import { a, useSpring } from '@react-spring/web'

import Collapse from '~/abstract/collapse'
import { Controller } from '~/abstract/notification'
import { c } from '~/utils/core'
import { useUpdate } from '~/utils/hooks'

export interface Props {
  className?: string | undefined
  notification: Controller
  children?: React.ReactNode | undefined
  getFrom: (notification: Controller) => Record<string, unknown>
  getTo: (notification: Controller) => Record<string, unknown>
}

const displayName = 'ui-Notification'

/**
 * Notification
 */
export default function Component(props: Props): JSX.Element {
  useUpdate(subscribeToUpdates)

  const serialized = props.notification.serialize()

  const spring = useSpring({
    from: props.getFrom(props.notification),
    to: props.getTo(props.notification),
    onRest: () => {
      if (props.notification.status.value === 'enter') props.notification.setVisible()
      if (props.notification.status.value === 'exit') props.notification.status.set('exited')
    },
  })

  return (
    <Collapse style={{ overflow: 'visible' }} isExpanded={serialized.status !== 'exit'}>
      <a.div
        className={c(props.className, displayName, `--${serialized.status}`, `--${serialized.type}`)}
        onMouseEnter={(): void => props.notification.status.set('stoped')}
        onMouseLeave={(): void => props.notification.setVisible()}
        onClick={(): void => props.notification.status.set('exit')}
        style={spring}
      >
        {props.children}
      </a.div>
    </Collapse>
  )

  function subscribeToUpdates(update: () => void, uns: ((() => void) | undefined)[]): void {
    uns.push(props.notification.on('*', update))
  }
}

Component.displayName = displayName
