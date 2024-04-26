import React from 'react'

import AbstractLink from '~/abstract/canvas/widgets/edge/ui/edge'
import { Position } from '~/utils/core'

export interface Props extends React.SVGAttributes<SVGPathElement> {
  sourcePosition: Position | undefined
  targetPosition: Position | undefined
}

/**
 * Edge компонент
 * Позволяет добавить Offset относительно Position
 */
export default function Edge(props: Props): JSX.Element {
  const { sourcePosition, targetPosition, ...pathProps } = props

  return <AbstractLink {...pathProps} sourcePosition={sourcePosition} targetPosition={targetPosition} />
}
