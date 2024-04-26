// https://www.svgrepo.com/svg/471002/arrow-left
import { memo } from 'react'

import Icon, { IconProps } from '../ui/icon'

export function ArrowUpComponent(props: IconProps): JSX.Element {
  return (
    <Icon {...props}>
      <path
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        d='M12 19V5m0 0-7 7m7-7 7 7'
      />
    </Icon>
  )
}

export const ArrowUp = memo(ArrowUpComponent)
