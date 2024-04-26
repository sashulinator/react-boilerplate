import './background.scss'

import { CSSProperties, memo, useMemo, useRef } from 'react'
import { c, generateId } from 'utils/core'

import DotPattern from '../widgets/dot-pattern'
import LinePattern from '../widgets/line-pattern/ui/line-pattern'

const defaultSize = {
  dots: 1,
  line: 1,
  cross: 6,
}

export interface Props {
  id?: string
  /** Color of the pattern */
  color?: string
  /** Color of the background */
  bgColor?: string
  /** Class applied to the container */
  className?: string
  /** Gap between repetitions of the pattern */
  gap?: number | [number, number]
  /** Size of a single pattern element */
  size?: number
  /** Offset of the pattern */
  offset?: number
  /** transform [x, y, scale] */
  transform: [number, number, number]
  /** Line width of the Line pattern */
  lineWidth?: number
  /** Variant of the pattern */
  variant: 'dots' | 'line' | 'cross'
  /** Style applied to the container */
  style?: CSSProperties
}

const displayName = 'a-Canvas-w-Background'

export function Component(props: Props): JSX.Element {
  const {
    id,
    variant,
    // only used for dots and cross
    gap = 20,
    // only used for lines and cross
    size,
    lineWidth = 1,
    offset = 2,
    color,
    bgColor,
    style,
    className,
    transform,
  } = props

  const ref = useRef<SVGSVGElement>(null)
  const patternId = useMemo(() => `${generateId()}-${id || 0}`, [id])

  const patternSize = size || defaultSize[variant]
  const isDots = variant === 'dots'
  const isCross = variant === 'cross'
  const gapXY: [number, number] = Array.isArray(gap) ? gap : [gap, gap]
  const scaledGap: [number, number] = [gapXY[0] * transform[2] || 1, gapXY[1] * transform[2] || 1]
  const scaledSize = patternSize * transform[2]

  const patternDimensions: [number, number] = isCross ? [scaledSize, scaledSize] : scaledGap

  const patternOffset = isDots
    ? [scaledSize / offset, scaledSize / offset]
    : [patternDimensions[0] / offset, patternDimensions[1] / offset]

  return (
    <svg
      className={c(className, displayName, `--${variant}`)}
      style={
        {
          ...style,
          '--props-background_bg': bgColor,
          '--props-background_color': color,
        } as CSSProperties
      }
      ref={ref}
    >
      <pattern
        id={patternId}
        x={transform[0] % scaledGap[0]}
        y={transform[1] % scaledGap[1]}
        width={scaledGap[0]}
        height={scaledGap[1]}
        patternUnits='userSpaceOnUse'
        patternTransform={`translate(-${patternOffset[0]},-${patternOffset[1]})`}
      >
        {variant === 'dots' ? (
          <DotPattern className='dotPattern' radius={scaledSize / offset} />
        ) : (
          <LinePattern className='linePattern' dimensions={patternDimensions} lineWidth={lineWidth} variant={variant} />
        )}
      </pattern>
      <rect x='0' y='0' width='100%' height='100%' fill={`url(#${patternId})`} />
    </svg>
  )
}

const MemoedComponent = memo(Component)
MemoedComponent.displayName = displayName
export default MemoedComponent
