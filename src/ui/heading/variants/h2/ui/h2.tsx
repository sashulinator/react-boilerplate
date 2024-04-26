import './h2.scss'

import React, { ForwardedRef, forwardRef } from 'react'

import { c } from '~/utils/core'

export interface Props extends React.HTMLAttributes<HTMLHeadingElement> {
  marginBottom?: null | 'xl' | 'xxxl'
}

const displayName = 'ui-H1'

export function Component(props: Props, ref: ForwardedRef<HTMLHeadingElement>): JSX.Element {
  const { marginBottom = 'xl', ...hProps } = props
  // eslint-disable-next-line jsx-a11y/heading-has-content
  return (
    <h2 {...hProps} className={c(props.className, displayName, `marginBottom--${marginBottom}`)} ref={ref}>
      {hProps.children}
    </h2>
  )
}

const ForwardRef = forwardRef(Component)
ForwardRef.displayName = displayName
export default ForwardRef
