import { memo } from 'react'

import Icon, { IconProps } from '../ui/icon'

const SvgComponent = (props: IconProps): JSX.Element => (
  <Icon {...props}>
    <path
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M21 10H8m13-4H4m17 8H4m17 4H8'
    />
  </Icon>
)

const AlignRight = memo(SvgComponent)
export { AlignRight }
