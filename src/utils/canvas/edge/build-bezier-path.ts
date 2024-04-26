// https://github.com/xyflow/xyflow/blob/main/packages/system/src/utils/edges/bezier-edge.ts
import { Position } from '~/utils/core'

export type Placement = 'left' | 'top' | 'right' | 'bottom'

export type GetBezierPathParams = {
  source: Position
  sourcePlacement?: Placement
  target: Position
  targetPlacement?: Placement
  curvature?: number
}

/**
 * Get a bezier path from source to target handle
 *
 * @param params.source - The Position of the source handle
 * @param params.sourcePlacement - The placement of the source handle (default: Placement.Bottom)
 * @param params.target - The Position of the target handle
 * @param params.targetPlacement - The placement of the target handle (default: Placement.Top)
 * @param params.curvature - The curvature of the bezier edge
 * @returns A path string you can use in an SVG, the labelX and labelY placement (center of path) and offsetX, offsetY between source handle and label
 */
export function buildBezierPath({
  source,
  sourcePlacement = 'bottom',
  target,
  targetPlacement = 'top',
  curvature = 0.25,
}: GetBezierPathParams): [path: string, labelX: number, labelY: number, offsetX: number, offsetY: number] {
  const sourceControl = getControlWithCurvature({
    pos: sourcePlacement,
    x1: source.x,
    y1: source.y,
    x2: target.x,
    y2: target.x,
    c: curvature,
  })
  const targetControl = getControlWithCurvature({
    pos: targetPlacement,
    x1: target.x,
    y1: target.y,
    x2: source.x,
    y2: source.y,
    c: curvature,
  })
  const [labelX, labelY, offsetX, offsetY] = getBezierEdgeCenter({
    source,
    target,
    sourceControl,
    targetControl,
  })

  return [
    `M${source.x},${source.y} C${sourceControl.x},${sourceControl.y} ${targetControl.x},${targetControl.y} ${target.x},${target.y}`,
    labelX,
    labelY,
    offsetX,
    offsetY,
  ]
}

/**
 * Private
 */

function calculateControlOffset(distance: number, curvature: number): number {
  if (distance >= 0) {
    return 0.5 * distance
  }

  return curvature * 25 * Math.sqrt(-distance)
}

export type GetControlWithCurvatureParams = {
  pos: Placement
  x1: number
  y1: number
  x2: number
  y2: number
  c: number
}

function getControlWithCurvature({ pos, x1, y1, x2, y2, c }: GetControlWithCurvatureParams): Position {
  switch (pos) {
    case 'left':
      return { x: x1 - calculateControlOffset(x1 - x2, c), y: y1 }
    case 'right':
      return { x: x1 + calculateControlOffset(x2 - x1, c), y: y1 }
    case 'top':
      return { x: x1, y: y1 - calculateControlOffset(y1 - y2, c) }
    case 'bottom':
      return { x: x1, y: y1 + calculateControlOffset(y2 - y1, c) }
  }
}

type GetBezierEdgeCenterParams = {
  source: Position
  target: Position
  sourceControl: Position
  targetControl: Position
}

export function getBezierEdgeCenter({
  source,
  target,
  sourceControl,
  targetControl,
}: GetBezierEdgeCenterParams): [number, number, number, number] {
  // cubic bezier t=0.5 mid point, not the actual mid point, but easy to calculate
  // https://stackoverflow.com/questions/67516101/how-to-find-distance-mid-point-of-bezier-curve
  const centerX = source.x * 0.125 + sourceControl.x * 0.375 + targetControl.x * 0.375 + target.x * 0.125
  const centerY = source.y * 0.125 + sourceControl.y * 0.375 + targetControl.y * 0.375 + target.y * 0.125
  const offsetX = Math.abs(centerX - source.x)
  const offsetY = Math.abs(centerY - source.y)

  return [centerX, centerY, offsetX, offsetY]
}
