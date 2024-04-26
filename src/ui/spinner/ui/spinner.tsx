import { SkewLoader } from 'react-spinners'

import { c } from '~/utils/core'

Spinner.displayName = 'ui-Spinner'

export interface Props {
  classNames?: string
  color?: string
  loading?: boolean | undefined
  size?: 's' | 'm' | 'l'
  rootProps?: React.HTMLAttributes<HTMLDivElement>
}

export default function Spinner(props: Props): JSX.Element {
  const { color = 'var(--primary)', loading = true, size = 'm', classNames } = props

  const sizeObj = {
    s: 7,
    m: 14,
    l: 24,
  }

  return (
    <SkewLoader className={c(Spinner.displayName, classNames)} color={color} loading={loading} size={sizeObj[size]} />
  )
}
