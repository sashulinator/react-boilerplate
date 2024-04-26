import { memo } from 'react'

import Icon, { IconProps } from '../ui/icon'

// https://www.svgrepo.com/svg/470995/check

export function CheckComponent(props: IconProps): JSX.Element {
  return (
    <Icon {...props}>
      <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M20 6 9 17l-5-5' />
    </Icon>
  )
}

export const Check = memo(CheckComponent)
