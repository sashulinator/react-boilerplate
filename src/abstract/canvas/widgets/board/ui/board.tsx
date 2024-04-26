import { ForwardedRef, forwardRef } from 'react'

import { c } from '~/utils/core'
import { setRefs } from '~/utils/react'

export interface Props extends React.SVGAttributes<SVGSVGElement> {
  children: React.ReactNode
}

const displayName = 'a-Canvas-w-Board'

/**
 * Canvas Board Component
 */
function Component(props: Props, ref: ForwardedRef<SVGSVGElement>): JSX.Element {
  return <svg width='100%' height='100%' {...props} className={c(props.className, displayName)} ref={setRefs(ref)} />
}

const ForwardRef = forwardRef<SVGSVGElement, Props>(Component)
ForwardRef.displayName = displayName
export default ForwardRef
