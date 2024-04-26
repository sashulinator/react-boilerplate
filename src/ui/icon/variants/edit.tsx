import { memo } from 'react'

import Icon, { IconProps } from '../ui/icon'

const SvgComponent = (props: IconProps): JSX.Element => (
  <Icon {...props}>
    <path
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='m18 10-4-4M2.5 21.5l3.384-.376c.414-.046.62-.07.814-.132a2 2 0 0 0 .485-.233c.17-.112.317-.259.61-.553L21 7a2.828 2.828 0 1 0-4-4L3.794 16.206c-.294.294-.442.441-.553.61a2 2 0 0 0-.233.486c-.063.193-.086.4-.132.814L2.5 21.5Z'
    />
  </Icon>
)

const Edit = memo(SvgComponent)
export { Edit }
