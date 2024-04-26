import { memo } from 'react'

import Icon, { IconProps } from '../ui/icon'

// https://www.svgrepo.com/svg/471814/refresh-ccw-01

export function RefreshComponent(props: IconProps): JSX.Element {
  return (
    <Icon {...props}>
      <path
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        d='M2 10s2.005-2.732 3.634-4.362A9 9 0 1 1 12 21a9.004 9.004 0 0 1-8.648-6.5M2 10V4m0 6h6'
      />
    </Icon>
  )
}

export const Refresh = memo(RefreshComponent)
