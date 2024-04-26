import { c } from '~/utils/core'

export interface Props extends React.HTMLAttributes<HTMLDivElement> {
  /** Задает высоту поля, в наследуемом компоненте может быть 's' | 'm' | 'l' */
  height?: string | undefined
  /** Задает набор стилей, в наследуемом компоненте может быть 'transparent' | 'borderless' */
  variant?: string[] | undefined
  readOnly?: boolean | undefined
  disabled?: boolean | undefined
  isError?: boolean | undefined
  isLoading?: boolean | undefined
  isFocused?: boolean | undefined
  hidden?: boolean | undefined
}

const displayName = 'a-Field'

/**
 * a-Field
 */
export default function Field(props: Props): JSX.Element {
  const { height, readOnly, isFocused, isLoading, isError, disabled, variant = [], hidden, ...divProps } = props

  return (
    <div
      aria-readonly={readOnly}
      aria-hidden={hidden}
      aria-disabled={disabled}
      {...divProps}
      className={c(
        props.className,
        Field.displayName,
        isFocused && '--focused',
        isError && '--error',
        disabled && '--disabled',
        readOnly && '--readonly',
        hidden && '--hidden',
        isLoading && '--loading',
        height && `--${height}`,
        ...variant.map((v) => `--${v}`)
      )}
    >
      {props.children}
    </div>
  )
}

Field.displayName = displayName
