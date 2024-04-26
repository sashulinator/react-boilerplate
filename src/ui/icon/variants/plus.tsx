import { memo } from 'react'

import Icon, { IconProps } from '../ui/icon'

export function PlusComponent(props: IconProps): JSX.Element {
  return (
    <Icon {...props}>
      <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 5v14m-7-7h14' />
    </Icon>
  )
}

export const Plus = memo(PlusComponent)
