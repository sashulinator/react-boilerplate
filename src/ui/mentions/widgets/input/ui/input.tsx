import './input.scss'

import { useMemo } from 'react'
import { MentionsInputProps as IMentionsInputProps, MentionsInput as RMMentionsInput } from 'react-mentions'

import Field from '~/abstract/field/ui/field'
import { FieldProps } from '~/ui/field'
import { c } from '~/utils/core'
import { fns } from '~/utils/function'
import { useBoolean } from '~/utils/hooks'

Input.displayName = 'ui-Mentions-w-Input'

export interface Props extends IMentionsInputProps {
  fieldProps?: FieldProps
  isError?: boolean | undefined
  transparent?: boolean | undefined
  minH?: number | undefined
  maxH?: number | undefined
  widthInput?: number | undefined
}

export default function Input(props: Props): JSX.Element {
  const { fieldProps, isError, transparent, minH, maxH, widthInput, className, ...mentionInputProps } = props

  const [isFocused, focus, blur] = useBoolean(false)

  const style = useMemo(() => getStyle(minH, maxH, widthInput), [minH, maxH, widthInput])

  return (
    <Field
      variant={transparent ? ['transparent'] : undefined}
      isError={isError}
      isFocused={isFocused}
      disabled={mentionInputProps.disabled}
      {...fieldProps}
      className={c(className, Input.displayName)}
      height={undefined}
    >
      <RMMentionsInput
        {...mentionInputProps}
        onFocus={fns(props.onFocus, focus)}
        onBlur={fns(props.onBlur, blur)}
        className={c('input')}
        style={style}
      />
    </Field>
  )

  // Private

  function getStyle(minH?: number, maxH?: number, width?: number): object {
    return {
      '&multiLine': {
        minHeight: minH || 100,
        control: {},
      },

      input: {
        padding: '4px 8px',
      },

      suggestions: {
        margin: '22px 0 0 0',
        item: {},
        list: {
          maxHeight: maxH || 500,
          width: width || 300,
          overflow: 'auto',
          position: 'absolute',
        },
      },
    }
  }
}
