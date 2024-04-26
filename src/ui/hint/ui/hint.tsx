import './hint.scss'

import { messageMap } from '~/lib/validation/messages-map'
import { c } from '~/utils/core'

export interface Props extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
  message: string | undefined
  isError?: boolean | undefined
  isSuccess?: boolean | undefined
  hidden?: boolean | undefined
}

const displayName = 'ui-Hint'

/**
 * Hint
 */
export default function Component(props: Props): JSX.Element | null {
  const { className, message, isError, isSuccess, hidden, ...divProps } = props

  if (!message || hidden) return null

  return (
    <div className={c(className, displayName, isError && '--error', isSuccess && '--success')} {...divProps}>
      {messageMap[message] ?? props.message}
    </div>
  )
}

Component.displayName = displayName
