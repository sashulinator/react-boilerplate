import './button.css'

import UnstyledButton, { UnstyledButtonProps } from 'abstract/unstyled-button'
import { ForwardedRef, forwardRef } from 'react'

import { c } from '~/utils/core'

import { getClassnames } from '../lib/get-classnames'

export interface Props extends UnstyledButtonProps {
  height?: 's' | 'm' | 'l' | null | undefined
  padding?: 's' | 'm' | 'l' | null | undefined
  square?: boolean | undefined
  round?: boolean | undefined
}

export const displayName = 'a-Button'

/**
 * Button component
 */
function Component(props: Props, ref: ForwardedRef<HTMLButtonElement>): JSX.Element {
  const { height = 'm', square, round, padding = 'm', ...restProps } = props

  const classnames = getClassnames({ height, square, round, padding })

  return (
    <UnstyledButton
      {...restProps}
      ref={ref}
      className={c(props.className, displayName, restProps.disabled && '--disabled', ...classnames)}
    >
      {props.children}
    </UnstyledButton>
  )
}

const ForwardRef = forwardRef(Component)
ForwardRef.displayName = displayName
export default ForwardRef
