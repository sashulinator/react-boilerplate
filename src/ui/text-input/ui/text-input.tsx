import './text-input.css'

import { ForwardedRef, forwardRef } from 'react'

import TextInput from '~/abstract/text-input'
import Field, { FieldProps } from '~/ui/field'
import { c } from '~/utils/core'

const displayName = 'ui-TextInput'

export type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  height?: 'm' | 's' | 'l'
  width?: string
  left?: React.ReactNode
  right?: React.ReactNode
  isError?: boolean
  isLoading?: boolean | undefined
  variant?: FieldProps['variant']
  fieldProps?: FieldProps
  inputClassname?: string
}

function Component(props: Props, ref: ForwardedRef<HTMLInputElement>): JSX.Element {
  const {
    left,
    right,
    className,
    fieldProps,
    height = 'l',
    inputClassname,
    variant,
    width,
    isError,
    isLoading,
    ...inputProps
  } = props

  return (
    <TextInput
      autoComplete='off'
      {...inputProps}
      className={c(inputClassname, 'input')}
      ref={ref}
      left={left}
      right={right}
      renderField={Field}
      fieldProps={{
        hidden: inputProps.hidden,
        disabled: inputProps.disabled,
        height,
        isError,
        isLoading,
        variant,
        ...fieldProps,
        style: { width, ...props.fieldProps?.style },
        className: c(fieldProps?.className, className, displayName),
      }}
    />
  )
}

const ForwardRef = forwardRef(Component)
ForwardRef.displayName = displayName
export default ForwardRef
