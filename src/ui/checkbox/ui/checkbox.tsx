import './checkbox.css'

import { emitter } from '~/shared/emitter'
import { Check } from '~/ui/icon/variants/check'
import { c } from '~/utils/core'

import { dark } from '../themes/dark'
import { light } from '../themes/light'

emitter.emit('addThemes', { dark, light })

Checkbox.displayName = 'ui-Checkbox'

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'height' | 'value'> {
  labelProps?: React.LabelHTMLAttributes<HTMLLabelElement>
  height?: 's' | 'm' | 'l' | undefined
  round?: boolean
  value?: boolean | undefined
}

export default function Checkbox(props: CheckboxProps): JSX.Element {
  const { labelProps, height = 'm', className, checked = false, round, value, ...checkboxProps } = props

  return (
    <label
      {...labelProps}
      className={c(
        Checkbox.displayName,
        labelProps?.className,
        className,
        props.checked && '--checked',
        height && `--${height}`,
        round && `--round`
      )}
    >
      <input
        {...checkboxProps}
        value={value as undefined}
        checked={checked}
        type='checkbox'
        className={c(props.className, 'input')}
      />
      <div className='box'>{checked && <Check />}</div>
      {props.placeholder && <div>{props.placeholder}</div>}
    </label>
  )
}
