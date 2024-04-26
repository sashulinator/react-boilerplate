import { c } from '~/utils/core'

export interface Props {
  dimensions: [number, number]
  variant: 'cross' | 'line'
  lineWidth?: number
  className?: string
}

const displayName = 'a-Canvas-w-Background-w-LinePattern'

export default function Component(props: Props): JSX.Element {
  const { dimensions, lineWidth, variant, className } = props

  return (
    <path
      strokeWidth={lineWidth}
      d={`M${dimensions[0] / 2} 0 V${dimensions[1]} M0 ${dimensions[1] / 2} H${dimensions[0]}`}
      className={c(className, `--${variant}`, displayName)}
    />
  )
}

Component.displayName = displayName
