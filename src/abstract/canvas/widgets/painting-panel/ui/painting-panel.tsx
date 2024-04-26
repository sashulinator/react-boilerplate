import React, { ForwardedRef, forwardRef } from 'react'

import { Position, c } from '~/utils/core'

export interface Props extends React.SVGAttributes<SVGGElement> {
  translate: Position
  scale: number
  children?: React.ReactNode
}

const displayName = 'a-Canvas-w-PaintingPanel'

/**
 * Canvas Painting Panel Component
 */
export function Component(props: Props, ref: ForwardedRef<SVGGElement>): JSX.Element {
  const { translate, scale, ...gProps } = props
  return (
    <g
      {...gProps}
      ref={ref}
      className={c(props?.className, displayName)}
      transform={`translate(${translate.x}, ${translate.y}) scale(${scale})`}
    />
  )
}

const ForwardRef = forwardRef<SVGGElement, Props>(Component)
ForwardRef.displayName = displayName
export default ForwardRef
