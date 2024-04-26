import { memo } from 'react'

import Icon, { IconProps } from '../ui/icon'

// https://www.svgrepo.com/svg/471166/chevron-left

export function ChevronLeftComponent(props: IconProps): JSX.Element {
  return (
    <Icon {...props}>
      <path d='M15 18L9 12L15 6' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
    </Icon>
  )
}

export const ChevronLeft = memo(ChevronLeftComponent)
