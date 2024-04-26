import './flex.css'

import { ForwardedRef, createElement, forwardRef } from 'react'

import { Any, c } from '~/utils/core'
import { setRefs } from '~/utils/react'

const displayName = 'a-Flex'

export interface Props extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType<React.HTMLAttributes<HTMLElement>>
  className?: string | undefined
  dir?: 'column' | 'row'
  /**
   * @deprecated
   */
  mainAxis?: 'center' | 'start' | 'end' | 'space-between' | 'space-around' | 'space-evenly'
  /**
   * @deprecated
   */
  crossAxis?: 'center' | 'start' | 'end' | 'stretch'
  justifyContent?: 'center' | 'start' | 'end' | 'space-between' | 'space-around' | 'space-evenly'
  alignItems?: 'center' | 'start' | 'end' | 'stretch'
  margin?: string
  padding?: string
  width?: string
  flex?: string | undefined
  height?: string
  children?: React.ReactNode
  style?: React.CSSProperties | undefined
  gap?: 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl' | 'xxxl' | undefined
}

export function Component(props: Props, ref: ForwardedRef<HTMLElement>): JSX.Element {
  const {
    as = 'div',
    dir = 'row',
    gap,
    mainAxis,
    crossAxis = 'start',
    margin,
    padding,
    children,
    flex,
    width,
    height,
    justifyContent,
    alignItems,
    style,
    ...restProps
  } = props

  const justifyContentRet = justifyContent || mainAxis || 'start'
  const alignItemsRet = alignItems || crossAxis || 'start'

  return createElement(
    as,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    {
      ...restProps,
      className: c(
        props.className,
        Component.displayName,
        `--${dir}`,
        gap && `--${gap}`,
        `--mainAxis-${justifyContentRet}`,
        `--crossAxis-${alignItemsRet}`
      ),
      style: {
        margin,
        padding,
        width,
        height,
        flex,
        ...style,
      },
      ref: setRefs(ref),
    } as Any,
    children
  )
}

Component.displayName = displayName
const ForwardRef = forwardRef(Component)
export default ForwardRef
