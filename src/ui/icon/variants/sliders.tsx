import { memo } from 'react'

import Icon, { IconProps } from '../ui/icon'

const SlidersComponent = (props: IconProps): JSX.Element => (
  <Icon {...props}>
    <path
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M15.05 9H5.5a2.5 2.5 0 0 1 0-5h9.55m-6.1 16h9.55a2.5 2.5 0 0 0 0-5H8.95M3 17.5a3.5 3.5 0 1 0 7 0 3.5 3.5 0 0 0-7 0Zm18-11a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z'
    />
  </Icon>
)

export const Sliders = memo(SlidersComponent)
