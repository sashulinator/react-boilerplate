import './text-input.css'

import { ForwardedRef, createElement, forwardRef } from 'react'

import { c } from '~/utils/core'
import { fns } from '~/utils/function'
import { useBoolean } from '~/utils/hooks'

const displayName = 'a-TextInput'

export type Props<TFieldProps extends object> = React.InputHTMLAttributes<HTMLInputElement> & {
  left?: React.ReactNode
  right?: React.ReactNode
  fieldProps: TFieldProps
  renderField: (props: TFieldProps) => JSX.Element
}

/**
 * Компонент TextInput
 *
 * Предполагает что сам по себе он использован не будет,
 * но будет вложен в компонент `Field`,
 * который принимает через пропс `renderField`
 *
 * Фичи:
 * 1. Передает компоненту Field пропс isFocused
 * 2. Отрисовывает слева/справа от инпута елемент
 */
function Component<TFieldProps extends object>(
  props: Props<TFieldProps>,
  ref: ForwardedRef<HTMLInputElement>
): JSX.Element {
  const { left, right, className, fieldProps, renderField, ...inputProps } = props

  const [isFocused, setFocused, unsetFocused] = useBoolean(false)

  const children = (
    <>
      {left}
      <input
        {...inputProps}
        ref={ref}
        className={c(className, displayName)}
        onFocus={fns(props.onFocus, setFocused)}
        onBlur={fns(props.onBlur, unsetFocused)}
      />
      {right}
    </>
  )

  return <>{createElement(renderField, { ...fieldProps, isFocused }, children)}</>
}

Component.displayName = displayName

// Генерик схлопывается при использовании forwardRef
// https://stackoverflow.com/questions/58469229/react-with-typescript-generics-while-using-react-forwardref
const ForwardRef = forwardRef(Component) as <TFieldProps extends object>(
  props: Props<TFieldProps> & { ref?: ForwardedRef<HTMLInputElement> }
) => JSX.Element
export default ForwardRef
