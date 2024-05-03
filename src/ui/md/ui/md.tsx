import './md.css'

import { type ClassAttributes, HTMLAttributes, type ReactHTML, createElement } from 'react'

import { c } from '~/utils/core'
import { toHtml } from '~/utils/md'

export interface Props<P extends HTMLAttributes<T>, T extends HTMLElement> {
  className?: string | undefined
  as?: keyof ReactHTML | undefined
  props?: (ClassAttributes<T> & P) | null | undefined
  children: string
}

const displayName = 'ui-Md'

/**
 * ui-Md'
 */
export default function Component<P extends HTMLAttributes<T>, T extends HTMLElement>(props: Props<P, T>): JSX.Element {
  const { children, className, as = 'div', ...restProps } = props

  return createElement(as, {
    className: c(className, displayName),
    dangerouslySetInnerHTML: { __html: toHtml(children) },
    ...restProps,
  })
}

Component.displayName = displayName
