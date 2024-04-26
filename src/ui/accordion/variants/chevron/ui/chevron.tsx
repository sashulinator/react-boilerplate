import './chevron.css'

import { CollapseProps } from '~/abstract/collapse'
import Button, { ButtonProps } from '~/ui/button'
import { ChevronRight } from '~/ui/icon'
import Tooltip from '~/ui/tooltip/ui/tooltip'
import { c } from '~/utils/core'

import Accordion from '../../../'

ChevronAccordion.displayName = 'ui-Accordion-v-Chevron'

export interface ChevronAccordionProps {
  header: React.ReactNode
  variants?: ('bg' | 'bgSecondary' | 'transparent' | 'borderless')[]
  height?: 's' | 'm' | 'l' | null
  rootProps?: React.HTMLAttributes<HTMLDivElement>
  collapseProps?: Omit<CollapseProps, 'children' | 'isExpanded'>
  isExpanded?: boolean | undefined
  onExpandedChange?: ((value: boolean) => void) | undefined
  defaultExpanded?: boolean | undefined
  children: React.ReactNode
  className?: string
  arrowButtonProps?: ButtonProps | undefined
}

export function ChevronAccordion(props: ChevronAccordionProps): JSX.Element {
  return (
    <Accordion
      {...props}
      className={c(props.className, ChevronAccordion.displayName)}
      renderHeader={Header}
      headerProps={{ children: props.header, arrowButtonProps: props.arrowButtonProps }}
    />
  )
}

// Private

interface HeaderProps {
  children: React.ReactNode
  arrowButtonProps?: ButtonProps | undefined
  isExpanded: boolean
  setExpanded: (isExpanded: boolean) => void
}

function Header(props: HeaderProps): JSX.Element {
  return (
    <div className={c('header')}>
      {props.children}
      <Tooltip contents='Раскрыть'>
        <Button
          onClick={(): void => props.setExpanded(!props.isExpanded)}
          square={true}
          height='s'
          {...props.arrowButtonProps}
        >
          <ChevronRight className={c('arrow', props.isExpanded && '--rotated')} />
        </Button>
      </Tooltip>
    </div>
  )
}
