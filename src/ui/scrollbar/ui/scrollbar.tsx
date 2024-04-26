import { ForwardedRef, forwardRef } from 'react'
import { ScrollbarProps, Scrollbars } from 'react-custom-scrollbars'

import { c } from '~/utils/core'

export interface Props extends ScrollbarProps {
  className?: string | undefined
}

const displayName = 'ui-Scrollbar'

/**
 * Scrollbar
 */
export function Component(props: Props, ref: ForwardedRef<Scrollbars>): JSX.Element {
  return (
    <Scrollbars
      className={c(props.className, displayName)}
      autoHide={true}
      autoHideTimeout={1000}
      autoHideDuration={500}
      ref={ref}
      {...props}
    />
  )
}

const ForwardRef = forwardRef(Component)
ForwardRef.displayName = displayName
export default ForwardRef
