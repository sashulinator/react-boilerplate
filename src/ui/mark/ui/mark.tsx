import './mark.scss'

import Tooltip, { Point } from '~/ui/tooltip'
import { c } from '~/utils/core'

export interface Props extends React.HTMLAttributes<HTMLSpanElement> {
  className?: string
  children: React.ReactNode
  padding?: 's' | 'm'
  tooltipContent: React.ReactNode
  transparent?: boolean | undefined
  placement?: Point | undefined
}

const displayName = 'ui-Mark'

/**
 * Mark
 */
export default function Component(props: Props): JSX.Element {
  const { tooltipContent, transparent = true, placement, ...spanProps } = props

  return (
    <Tooltip contents={tooltipContent} delay={300} placement={placement}>
      <span {...spanProps} className={c(props.className, displayName, transparent && '--transparent')}>
        {props.children}
      </span>
    </Tooltip>
  )
}

Component.displayName = displayName
