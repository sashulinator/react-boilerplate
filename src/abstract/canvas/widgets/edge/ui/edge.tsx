import { ForwardedRef, forwardRef } from 'react'

import { Nil, Position, c, isNil } from '~/utils/core'

export interface Props extends React.SVGAttributes<SVGPathElement> {
  sourcePosition: Position | Nil
  targetPosition: Position | Nil
}

const displayName = 'a-Canvas-w-Edge'

/**
 * Canvas Edge Component
 * Отрисовывает path если sourcePosition и targetPosition переданы, иначе вернет null
 */
function Component(props: Props, ref: ForwardedRef<SVGPathElement>): JSX.Element | null {
  const { sourcePosition: s, targetPosition: t, ...pathProp } = props

  const path = drawPath()

  if (!path) return null

  return (
    <path d={path} strokeWidth={2} fill='none' {...pathProp} className={c(props.className, displayName)} ref={ref} />
  )

  // Private

  function drawPath(): string | null {
    if (isNil(s) || isNil(t)) return null
    const start = s
    const end = t
    const startLine = { x: start.x + 30, y: start.y }
    const endLine = { x: end.x - 30, y: end.y }

    return `M ${start.x} ${start.y} L ${startLine.x} ${startLine.y} L ${endLine.x} ${endLine.y} L ${end.x} ${end.y}`
  }
}

const ForwardRef = forwardRef(Component)
ForwardRef.displayName = displayName
export default ForwardRef
