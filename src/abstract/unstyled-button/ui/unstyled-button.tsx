import './unstyled-button.css'

import React, { ForwardedRef, forwardRef } from 'react'

import { c } from '~/utils/core'

export type Props = React.ButtonHTMLAttributes<HTMLButtonElement>

const displayName = 'a-UnstyledButton'

/**
 * Unstyled Button component
 */
function Component(props: Props, ref: ForwardedRef<HTMLButtonElement>): JSX.Element {
  return <button {...props} type={props.type || 'button'} className={c(props.className, displayName)} ref={ref} />
}

Component.displayName = 'a-UnstyledButton'

const ForwardRef = forwardRef(Component)
ForwardRef.displayName = Component.displayName
export default ForwardRef
