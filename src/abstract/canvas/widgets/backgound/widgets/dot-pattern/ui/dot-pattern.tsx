import { c } from '~/utils/core'

export interface Props {
  radius: number
  className?: string
}

const displayName = 'a-Canvas-w-Background-w-DotPattern'

export default function Component(props: Props): JSX.Element {
  const { radius, className } = props

  return <circle cx={radius} cy={radius} r={radius} className={c(className, displayName)} />
}

Component.displayName = displayName
