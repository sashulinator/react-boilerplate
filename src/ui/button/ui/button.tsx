import './button.scss'

import { ForwardedRef, forwardRef, memo } from 'react'

import AbstractButton, { ButtonProps as AbstractButtonProps } from '~/abstract/button'
import Flex from '~/abstract/flex'
import { c } from '~/utils/core'

import { getGhostClassnames } from '../lib/get-ghost-classnames'
import { getPrimaryClassnames } from '../lib/get-primary-classnames'
import { getRegularClassnames } from '../lib/get-regular-classnames'
import { getTooltipClassnames } from '../lib/get-tooltip-classnames'

export const displayName = 'ui-Button'

export interface Props extends Omit<AbstractButtonProps, 'height'> {
  height?: 's' | 'm' | 'l' | null | undefined
  variant?: 'default' | 'regular' | 'primary' | 'ghost' | 'tooltip' | undefined
}

function Component(props: Props, ref: ForwardedRef<HTMLButtonElement>): JSX.Element {
  const { height = 'm', variant = 'default', ...buttonProps } = props

  const variantClassNames =
    variant === 'primary'
      ? getPrimaryClassnames()
      : variant === 'ghost'
        ? getGhostClassnames()
        : variant === 'regular'
          ? getRegularClassnames()
          : variant === 'tooltip'
            ? getTooltipClassnames()
            : []

  return (
    <AbstractButton
      {...buttonProps}
      ref={ref}
      className={c(props.className, displayName, ...variantClassNames)}
      height={height}
    >
      <Flex as='span' width='100%' height='100%' mainAxis='center' crossAxis='center'>
        {props.children}
      </Flex>
    </AbstractButton>
  )
}

const ForwardRef = forwardRef(Component)
const ForwardRefMemo = memo(ForwardRef)
ForwardRefMemo.displayName = displayName
export default ForwardRefMemo
