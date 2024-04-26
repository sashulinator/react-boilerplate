import './clearable.css'

import { ForwardedRef, forwardRef, useRef } from 'react'

import Button from '~/ui/button'
import { Close } from '~/ui/icon'
import { c } from '~/utils/core'
import { preventDefault, setInputValue } from '~/utils/dom-event'
import { fns } from '~/utils/function'
import { setRefs } from '~/utils/react'

import TextInput, { Props as TextInputProps } from '../../../ui/text-input'

export type Props = TextInputProps

const displayName = 'ui-TextInput-v-Clearable'

/**
 * Clearable TextInput
 */
function Component(props: Props, ref: ForwardedRef<HTMLInputElement>): JSX.Element {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <TextInput
      className={c(props.className, displayName)}
      {...props}
      ref={setRefs(inputRef, ref)}
      right={
        <Button
          variant='ghost'
          round={true}
          style={{ visibility: props.value && !props.disabled ? 'visible' : 'hidden' }}
          height='s'
          className='close'
          onClick={fns(
            preventDefault,
            (): void => setInputValue(inputRef.current, ''),
            (): void => inputRef.current?.focus()
          )}
        >
          <Close />
        </Button>
      }
    />
  )
}

const ForwardRef = forwardRef(Component)
ForwardRef.displayName = displayName
export default ForwardRef
