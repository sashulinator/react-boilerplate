import Flex from 'abstract/flex'
import Checkbox from 'ui/checkbox'
import Labeled from 'ui/labeled'
import { emptyFn } from 'utils/function'
import * as Storybook from 'utils/storybook'

interface State {
  round: boolean
}

export default {
  getName: (): string => Checkbox.displayName,

  getDescription: function Description(): JSX.Element {
    return (
      <>
        <h1>{Checkbox.displayName}</h1>
        Добавьте описание
      </>
    )
  },

  element: function Element(props: Storybook.Props<State>): JSX.Element {
    const { state } = props

    return (
      <Flex dir='column' gap='xl' width='100%'>
        <Labeled label='unchecked'>
          <Checkbox height='s' placeholder='placeholder' {...state} onChange={emptyFn} />
        </Labeled>
        <Labeled label='checked'>
          <Checkbox checked height='s' placeholder='placeholder' {...state} onChange={emptyFn} />
        </Labeled>
        <Labeled label='disabled'>
          <Checkbox disabled height='s' placeholder='placeholder' {...state} onChange={emptyFn} />
        </Labeled>
        <Labeled label='checked disabled'>
          <Checkbox checked disabled height='s' placeholder='placeholder' {...state} onChange={emptyFn} />
        </Labeled>
      </Flex>
    )
  },

  controls: [{ name: 'round', input: 'checkbox', defaultValue: true }],
} satisfies Storybook.Config<State>
