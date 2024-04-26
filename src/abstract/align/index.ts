/**
 * ui
 */
import { default as Align } from './ui/align'

export default Align
export type { Props as AlignProps, Overflow, Config, OnAligned, AlignResult } from './ui/align'

/**
 * lib
 */
export { adjustPoints } from './lib/adjust-points'
export { arePointsEqual } from './lib/are-poins-equal'

/**
 * reexports
 */
export { flipPointHorizontally, flipPointVertically } from 'dom-align-ts'
export type { Offset, Point, Points } from 'dom-align-ts'
