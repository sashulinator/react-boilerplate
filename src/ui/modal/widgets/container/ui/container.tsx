import { c } from '~/utils/core'

export interface Props {
  className?: string
}

export const displayName = 'ui-Modal-v-Container'

/**
 * Container
 */
export default function Component(props: Props): JSX.Element {
  return <div style={{ zIndex: 500, position: 'fixed', left: 0, top: 0 }} className={c(props.className, displayName)} />
}

Component.displayName = displayName
