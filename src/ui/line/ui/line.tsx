import './line.css'

import { HTMLAttributes } from 'react'

import { c } from '~/utils/core'

Line.displayName = 'ui-Line'

export interface Props extends HTMLAttributes<HTMLHRElement> {
  className?: string
}

export default function Line(props: Props): JSX.Element {
  return <hr {...props} className={c(props.className, Line.displayName)} />
}
