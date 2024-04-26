import { c } from '~/utils/core'

export interface Props {
  className?: string
}

export const displayName = 'ui-Tooltip-v-Container'

/**
 * Container
 */
export default function Component(props: Props): JSX.Element {
  return <aside style={{ zIndex: 1000000, position: 'fixed' }} className={c(props.className, displayName)} />
}

Component.displayName = displayName
