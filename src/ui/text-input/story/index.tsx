import * as Storybook from 'utils/storybook'

import Flex from '~/abstract/flex'
import fieldStory from '~/ui/field/story'
import { H1 } from '~/ui/heading'

import TextInput, { TextInputProps } from '..'

interface State {
  isError: boolean
  disabled: boolean
  hidden: boolean
  transparent: boolean
  height: 's' | 'm' | 'l'
  insetFocus: boolean
}

export default {
  getName: (): string => TextInput.displayName || '',

  getDescription: function Description(): JSX.Element {
    return (
      <>
        <H1>{TextInput.displayName}</H1>
        Добавьте описание
      </>
    )
  },

  element: function Element(props: Storybook.Props<State>): JSX.Element {
    const {
      state: { transparent, insetFocus, ...restState },
    } = props

    const variant: TextInputProps['variant'] = []
    if (transparent) variant.push('transparent')
    if (insetFocus) variant.push('insetFocus')

    return (
      <Flex dir='column' width='100%' padding='3rem' style={{ border: '1px solid red' }}>
        <TextInput {...restState} variant={variant} />
      </Flex>
    )
  },

  controls: [...fieldStory.controls.filter((c) => c.name !== 'isFocused')],
} satisfies Storybook.Config<State>

/**
 * Private
 */
