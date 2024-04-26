import { c } from '~/utils/core'

export interface Props {
  className?: string | undefined
}

const displayName = 'a-Notification'

/**
 * Notification
 */
export default function Component(props: Props): JSX.Element {
  return <div className={c(props.className, displayName)}>Notification</div>
}

Component.displayName = displayName
