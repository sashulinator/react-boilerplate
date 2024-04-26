import { ForwardedRef, forwardRef, useRef } from 'react'

import Flex from '~/abstract/flex'
import { Search } from '~/ui/icon'
import { c } from '~/utils/core'
import { setRefs } from '~/utils/react'

import TextInput, { Props as TextInputProps } from '../../../ui/text-input'

export interface Props extends TextInputProps {}

const displayName = 'ui-TextInput-v-Search'

/**
 * Search TextInput
 */
function Component(props: Props, ref: ForwardedRef<HTMLInputElement>): JSX.Element {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <TextInput
      {...props}
      className={c(props.className, displayName)}
      ref={setRefs(ref, inputRef)}
      left={
        <Flex padding='0 0 0 var(--xl)' onClick={(): void => inputRef.current?.focus()}>
          <Search />
        </Flex>
      }
    />
  )
}

const ForwardRef = forwardRef(Component)
ForwardRef.displayName = displayName
export default ForwardRef
