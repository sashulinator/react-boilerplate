// https://www.svgrepo.com/svg/471002/arrow-left
import { memo } from 'react'

import Icon, { IconProps } from '../ui/icon'

export function ArrowDownComponent(props: IconProps): JSX.Element {
  return (
    <Icon {...props}>
      <path
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        d='M12 5v14m0 0 7-7m-7 7-7-7'
      />
    </Icon>
  )
}

export const ArrowDown = memo(ArrowDownComponent)
