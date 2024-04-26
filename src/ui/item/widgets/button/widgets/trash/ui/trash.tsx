import './trash.scss'

import { ForwardedRef, forwardRef } from 'react'

import Button, { ButtonProps } from '~/ui/button'
import { Trash } from '~/ui/icon'
import { c } from '~/utils/core'
import { stopPropagation } from '~/utils/dom-event'

export interface Props extends Omit<ButtonProps, 'children'> {}

const displayName = 'ui-Item-w-Button-w-Trash'

/**
 * Edit
 */
function Component(props: Props, ref: ForwardedRef<HTMLButtonElement>): JSX.Element {
  const { onClick, ...linkProps } = props

  return (
    <Button
      {...linkProps}
      type='button'
      ref={ref}
      className={c(displayName, props.className)}
      onClick={(e): void => {
        stopPropagation(e)
        onClick?.(e)
      }}
      round={true}
    >
      <Trash />
    </Button>
  )
}

const ForwardRef = forwardRef(Component)
ForwardRef.displayName = displayName
export default ForwardRef
