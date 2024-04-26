import { Position } from '~/utils/core'

export function findNearestPoint(target: Position, points: Position[]): Position | null {
  if (points.length === 0) {
    return null
  }

  let nearestPoint: Position = points[0]
  let nearestDistanceSquared = calculateDistanceSquared(target, nearestPoint)

  for (let i = 1; i < points.length; i++) {
    const currentPoint = points[i]
    const currentDistanceSquared = calculateDistanceSquared(target, currentPoint)

    if (currentDistanceSquared < nearestDistanceSquared) {
      nearestPoint = currentPoint
      nearestDistanceSquared = currentDistanceSquared
    }
  }

  return nearestPoint
}

/**
 * Private
 */

function calculateDistanceSquared(coord1: Position, coord2: Position): number {
  const deltaX = coord2.x - coord1.x
  const deltaY = coord2.y - coord1.y

  return deltaX * deltaX + deltaY * deltaY
}
