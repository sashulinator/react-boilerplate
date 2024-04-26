import './link.scss'

import { displayName as aButtonDisplayName, getClassnames } from 'abstract/button'
import { ForwardedRef, forwardRef } from 'react'
import { Link, LinkProps } from 'react-router-dom'

import Flex from '~/abstract/flex'
import { emitter } from '~/shared/emitter'
import { displayName as buttonDisplayName, getGhostClassnames, getPrimaryClassnames } from '~/ui/button'
import { c } from '~/utils/core'

import { dark } from '../_themes/dark'
import { light } from '../_themes/light'

emitter.emit('addThemes', { dark, light })

export interface Props extends LinkProps {
  height?: 's' | 'm' | 'l' | null | undefined
  padding?: 's' | 'm' | 'l' | null | undefined
  square?: boolean | undefined
  round?: boolean | undefined
  buttonVariant?: 'regular' | 'primary' | 'ghost' | undefined
}

const displayName = 'ui-Link'

/**
 * Link
 */
export function Component(props: Props, ref: ForwardedRef<HTMLAnchorElement>): JSX.Element {
  const { height = 'm', padding = 'm', square, round, buttonVariant, ...linkProps } = props

  const buttonClassname = buttonVariant ? getClassnames({ height, square, padding, round }) : []
  const primaryClassnames =
    buttonVariant === 'primary' ? getPrimaryClassnames() : buttonVariant === 'ghost' ? getGhostClassnames() : []

  if (buttonVariant) {
    buttonClassname.push(buttonDisplayName)
    buttonClassname.push(aButtonDisplayName)
  }

  const children = Boolean(buttonVariant) ? (
    <Flex className='button-child' as='span' width='100%' height='100%' mainAxis='center' crossAxis='center'>
      {props.children}
    </Flex>
  ) : (
    props.children
  )

  return (
    <Link
      {...linkProps}
      ref={ref}
      className={c(props.className, displayName, ...buttonClassname, ...primaryClassnames)}
    >
      {children}
    </Link>
  )
}

const ForwardRef = forwardRef(Component)
ForwardRef.displayName = displayName
export default ForwardRef
