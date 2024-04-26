import './accordion.css'

import Accordion, { AccordionProps } from '~/abstract/accordion-new'
import { c } from '~/utils/core'

const displayName = 'uin-Accordion'

export interface Props<HeaderProps, TContentProps> extends AccordionProps<HeaderProps, TContentProps> {
  height?: 's' | 'm' | 'l' | null | undefined
}

export default function Component<HeaderProps, TContentProps>(props: Props<HeaderProps, TContentProps>): JSX.Element {
  const { height = 'm', ...accordionProps } = props

  return <Accordion {...accordionProps} height={height} className={c(props.className, displayName)} />
}

Component.displayName = displayName
