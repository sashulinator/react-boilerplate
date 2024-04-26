import * as Storybook from 'utils/storybook'

import Flex from '~/abstract/flex'
import { H1 } from '~/ui/heading'
import Labeled from '~/ui/labeled'
import TextInput from '~/ui/text-input'

interface State {
  direction: 'horizontal' | 'vertical'
  hidden: boolean
}

export default {
  getName: (): string => Labeled.displayName,

  getDescription: function Description(): JSX.Element {
    return (
      <>
        <H1>{Labeled.displayName}</H1>
        Добавьте описание
      </>
    )
  },

  element: function Element(props: Storybook.Props<State>): JSX.Element {
    const { state } = props

    return (
      <Flex dir='column' gap='xl' width='100%'>
        <Labeled label='Long name and without `htmlFor` prop at all' {...state}>
          <TextInput placeholder='Please enter your long name' />
        </Labeled>
        <Labeled htmlFor='test' label='with `htmlFor="test"` prop' {...state}>
          <TextInput placeholder='Test' />
        </Labeled>
      </Flex>
    )
  },

  controls: [
    {
      name: 'direction',
      input: 'select',
      options: ['horizontal', 'vertical'],
      defaultValue: 'vertical',
      style: { width: '200px' },
    },
    { name: 'hidden', input: 'checkbox', defaultValue: false },
  ],
} satisfies Storybook.Config<State>
