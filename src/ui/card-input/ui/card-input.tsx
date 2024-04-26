import './card-input.scss'

import React, { useState } from 'react'

import Flex from '~/abstract/flex'
import Field, { FieldProps } from '~/ui/field'
import { ChevronRight } from '~/ui/icon'
import { Dictionary, SetterOrUpdater, c } from '~/utils/core'
import { stopPropagation } from '~/utils/dom-event'
import { fns } from '~/utils/function'
import { useBoolean } from '~/utils/hooks'

export type DisplayProps<V, P extends Dictionary> = {
  value: V
} & P

export interface Props<V, P extends Dictionary> extends Omit<FieldProps, 'children' | 'onChange'> {
  className?: string | undefined
  displayProps?: P | undefined
  value?: V | undefined
  onChange: (e: { target: { value: V } }, v: V) => void
  renderDisplay: (option: DisplayProps<V, P>) => React.ReactNode
  children: (props: { isOpen: boolean; setOpen: SetterOrUpdater<boolean>; setValue: (v: V) => void }) => React.ReactNode
}

const displayName = 'ui-CardInput'

/**
 * CardInput
 */
export default function Component<V, P extends Dictionary>(props: Props<V, P>): JSX.Element {
  const { value, children, onChange, onBlur, onFocus, renderDisplay, displayProps, ...fieldProps } = props
  const [isFocused, focus, blur] = useBoolean(false)
  const [isOpen, setOpen] = useState(false)

  return (
    <Field
      {...fieldProps}
      className={c(props.className, displayName)}
      aria-disabled={props.disabled}
      tabIndex={props.disabled ? -1 : 0}
      onClick={fns(stopPropagation, () => !props.disabled && setOpen((s) => !s))}
      onKeyDown={(e): unknown => (e.key === 'Enter' && !props.disabled ? setOpen((s) => !s) : undefined)}
      isFocused={isFocused}
      onBlur={fns<[React.FocusEvent<HTMLDivElement, Element>]>((e) => (!isOpen ? onBlur?.(e) : undefined), blur)}
      onFocus={fns<[React.FocusEvent<HTMLDivElement, Element>]>(
        (): void => (!props.disabled ? focus() : undefined),
        onFocus
      )}
    >
      <Flex width='100%' className='display' crossAxis='center' mainAxis='space-between'>
        {renderDisplay({ value, ...displayProps } as DisplayProps<V, P>)}
        <span style={{ opacity: props.disabled ? '0.5' : '1', height: '1rem' }}>
          <ChevronRight />
        </span>
      </Flex>
      {children({ setValue: (value) => onChange({ target: { value } }, value), isOpen, setOpen })}
    </Field>
  )
}

Component.displayName = displayName
