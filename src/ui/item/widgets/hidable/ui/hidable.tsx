import './hidable.scss'

import Flex, { FlexProps } from '~/abstract/flex'
import { c } from '~/utils/core'

export interface Props extends FlexProps {
  className?: string | undefined
}

const displayName = 'ui-Item-w-Hidable'

/**
 * Hidable
 */
export default function Component(props: Props): JSX.Element {
  return <Flex {...props} className={c(props.className, displayName)} />
}

Component.displayName = displayName
