import './error.scss'

import { messageMap } from '~/lib/validation/messages-map'
import { c } from '~/utils/core'

export interface Props {
  classNames?: string
  error?: { code: string } | undefined
  hidden?: boolean | undefined
  rootProps?: React.HTMLAttributes<HTMLDivElement>
}

const displayName = 'ui-Error'

export default function Component(props: Props): JSX.Element | null {
  if (!props.error?.code || props.hidden) return null

  return (
    <div className={c(props.classNames, displayName)} {...props.rootProps}>
      {messageMap[props.error.code] ?? `Код ошибки: ${props.error.code}`}
    </div>
  )
}

Component.displayName = displayName
