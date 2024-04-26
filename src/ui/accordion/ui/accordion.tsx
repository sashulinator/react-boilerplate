import './accordion.css'

import AbstractAccordion, { AccordionProps as AbstractAccordionProps } from '~/abstract/accordion'
import { c } from '~/utils/core'

Component.displayName = 'ui-Accordion'

export interface Props<HeaderProps> extends AbstractAccordionProps<HeaderProps> {
  variants?: ('bg' | 'bgSecondary' | 'transparent' | 'borderless')[]
  height?: 's' | 'm' | 'l' | null
}

export default function Component<HeaderProps>(props: Props<HeaderProps>): JSX.Element {
  const { variants = ['transparent'], height = 'm', ...accordionProps } = props

  const variantClasses = variants.map((v) => `--${v}`)
  const heightClass = height === null ? null : `--${height}`

  return (
    <AbstractAccordion
      {...accordionProps}
      className={c(props.className, Component.displayName, heightClass, ...variantClasses)}
    />
  )
}
