import './danger.scss'

import { ForwardedRef, forwardRef } from 'react'

import { c } from '~/utils/core'

import Button, { Props as ButtonProps } from '../../../ui/button'

export interface Props extends ButtonProps {}

const displayName = 'ui-Button-v-Danger'

/**
 * Edit
 */
function Component(props: Props, ref: ForwardedRef<HTMLButtonElement>): JSX.Element {
  return <Button {...props} ref={ref} className={c(displayName, props.className)} />
}

const ForwardRef = forwardRef(Component)
ForwardRef.displayName = displayName
export default ForwardRef
