import { memo } from 'react'

import Icon, { IconProps } from '../ui/icon'

const SvgComponent = (props: IconProps): JSX.Element => (
  <Icon {...props}>
    <path
      fill='currentColor'
      fillRule='evenodd'
      d='M3.357 3.234a1 1 0 0 1 1.103-.122l16.325 8.455a1 1 0 0 1-.148 1.838l-6.854 2.254-3.41 6.359a1 1 0 0 1-1.836-.174L3.046 4.3a1 1 0 0 1 .311-1.065Zm2.314 2.758 4.064 12.983 2.474-4.614a1 1 0 0 1 .57-.478l4.973-1.635-12.08-6.256Z'
      clipRule='evenodd'
    />
  </Icon>
)

const Pointer = memo(SvgComponent)
export { Pointer }
