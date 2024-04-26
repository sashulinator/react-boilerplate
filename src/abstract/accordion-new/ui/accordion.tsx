import './accordion.css'

import { ForwardedRef, createElement, forwardRef } from 'react'

import { c } from '../../../utils/core'
import { useControlledState } from '../../../utils/hooks'
import Collapse, { CollapseProps } from '../../collapse'

export interface RenderWidgetProps {
  isExpanded: boolean
  setExpanded: (isExpanded: boolean) => void
}

export interface Props<THeaderProps, TContentProps> extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  height?: 's' | 'm' | 'l' | null | undefined
  isExpanded?: boolean | undefined
  collapseProps?: Omit<CollapseProps, 'children' | 'isExpanded'>
  headerProps: THeaderProps
  contentProps: TContentProps
  renderHeader: (props: THeaderProps & RenderWidgetProps) => JSX.Element | null
  renderContent: (props: TContentProps & RenderWidgetProps) => JSX.Element | null
  onExpandedChange?: ((value: boolean) => void) | undefined
}

const displayName = 'an-Accordion'

function Component<THeaderProps, TContentProps>(
  props: Props<THeaderProps, TContentProps>,
  ref: ForwardedRef<HTMLDivElement>
): JSX.Element {
  const {
    height,
    isExpanded: isExpandedProp,
    collapseProps,
    headerProps,
    contentProps,
    renderHeader,
    renderContent,
    onExpandedChange,
    ...divProps
  } = props

  const [isExpanded, setExpanded] = useControlledState(isExpandedProp || false, isExpandedProp, onExpandedChange)

  const header = createElement(renderHeader, { ...headerProps, setExpanded, isExpanded })
  const content = createElement(renderContent, { ...contentProps, setExpanded, isExpanded })

  const heightClass = height === null ? null : `--${height}`

  return (
    <div {...divProps} className={c(props.className, divProps?.className, displayName, heightClass)} ref={ref}>
      <div className='header'>{header}</div>
      <Collapse {...collapseProps} className={c('collapse')} isExpanded={isExpanded}>
        {content}
      </Collapse>
    </div>
  )
}

const ForwardRef = forwardRef(Component) as (<THeaderProps, TContentProps>(
  props: Props<THeaderProps, TContentProps> & { ref?: ForwardedRef<HTMLDivElement> }
) => JSX.Element) & { displayName: string }
ForwardRef.displayName = displayName
export default ForwardRef
