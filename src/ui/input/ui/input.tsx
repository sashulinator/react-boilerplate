import './input.scss'

import { createElement, useRef } from 'react'

import Field, { FieldProps } from '~/ui/field'
import { Dictionary, c } from '~/utils/core'
import { fns } from '~/utils/function'
import { useBoolean } from '~/utils/hooks'

export type DisplayProps<V, P extends Dictionary> = {
  focused: boolean
  value: V
  setValue: (v: V | undefined) => void
} & P

export interface Props<V, P extends Dictionary> extends Omit<FieldProps, 'children' | 'onChange'> {
  className?: string | undefined
  value?: V | undefined
  onChange: (e: { target: { value: V } }, v: V) => void
  displayProps?: P | undefined
  renderDisplay: (props: DisplayProps<V, P>) => JSX.Element
}

const displayName = 'ui-Input'

/**
 * Input
 * Обертка позволяющая создавать кастомные инпуты
 * Позволяет делигировать логику фокуса, дисейблинга и изменения значения
 */
export default function Component<V, P extends Dictionary>(props: Props<V, P>): JSX.Element {
  const { value, renderDisplay, onChange, onBlur, onFocus, displayProps, isFocused, ...fieldProps } = props
  const [focused, focus, blur] = useBoolean(false)

  const renderDisplayRef = useRef(renderDisplay)

  return (
    <Field
      {...fieldProps}
      className={c(props.className, displayName)}
      aria-disabled={props.disabled}
      tabIndex={props.disabled ? -1 : 0}
      isFocused={focused || isFocused}
      onBlur={fns(onBlur, blur)}
      onFocus={props.disabled ? undefined : fns(onFocus, focus)}
    >
      {createElement(renderDisplayRef.current, {
        setValue: (value) => onChange({ target: { value: value as V } }, value as V),
        value: value,
        focused,
        ...displayProps,
      } as DisplayProps<V, P>)}
    </Field>
  )
}

Component.displayName = displayName
