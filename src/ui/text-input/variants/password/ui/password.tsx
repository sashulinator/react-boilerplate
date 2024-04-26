import './password.scss'

import { ForwardedRef, forwardRef, useRef } from 'react'

import Button from '~/ui/button'
import { Eye, EyeOff } from '~/ui/icon'
import { c } from '~/utils/core'
import { preventDefault } from '~/utils/dom-event'
import { fns } from '~/utils/function'
import { useControlledState } from '~/utils/hooks'
import { setRefs } from '~/utils/react'

import TextInput, { Props as TextInputProps } from '../../../ui/text-input'

export interface Props extends TextInputProps {
  visible?: boolean | undefined
  onVisibleChange?: (value: boolean) => void
}

const displayName = 'ui-TextInput-v-Password'

/**
 * Password TextInput
 */
function Component(props: Props, ref: ForwardedRef<HTMLInputElement>): JSX.Element {
  const [visible, setVisible] = useControlledState(false, props.visible, props.onVisibleChange)
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <TextInput
      {...props}
      className={c(props.className, displayName)}
      ref={setRefs(ref, inputRef)}
      type={visible ? 'text' : 'password'}
      right={
        <Button
          variant='ghost'
          round={true}
          className='eye'
          height='s'
          onClick={fns(
            preventDefault,
            (): void => setVisible(!visible),
            (): void => inputRef.current?.focus()
          )}
        >
          {visible ? <EyeOff /> : <Eye />}
        </Button>
      }
    />
  )
}

const ForwardRef = forwardRef(Component)
ForwardRef.displayName = displayName
export default ForwardRef
