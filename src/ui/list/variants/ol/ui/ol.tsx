import './ol.css'

import { ForwardedRef, forwardRef } from 'react'

import { c } from '~/utils/core'

OlComponent.displayName = 'ui-List-v-Ol'

export type Props = React.HTMLAttributes<HTMLOListElement>

function OlComponent(props: Props, ref: ForwardedRef<HTMLOListElement>): JSX.Element {
  return <ol ref={ref} className={c(OlComponent.displayName)} {...props} />
}

const Ol = forwardRef(OlComponent)
Ol.displayName = OlComponent.displayName
export default Ol
