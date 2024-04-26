import * as Storybook from 'utils/storybook'

import Button from '../'

interface State {
  disabled: boolean
  height: 's' | 'm' | 'l' | 'null'
}

export default {
  getName: (): string => Button.displayName || '',

  getDescription: function Description(): JSX.Element {
    return (
      <>
        <h1>{Button.displayName}</h1>
        Добавьте описание
      </>
    )
  },

  element: function Element(props: Storybook.Props<State>): JSX.Element {
    const { state } = props

    return (
      <Button {...state} height={state.height === 'null' ? null : state.height}>
        Button
      </Button>
    )
  },

  controls: [
    {
      name: 'height',
      input: 'select',
      options: ['s', 'm', 'l', 'null', undefined],
      defaultValue: 's',
      style: { width: '200px' },
    },
    {
      name: 'variant',
      input: 'select',
      options: ['default', 'regular', 'ghost', 'primary', 'tooltip'],
      defaultValue: 'regular',
      style: { width: '200px' },
    },
    { name: 'disabled', input: 'checkbox', defaultValue: false },
  ],
} satisfies Storybook.Config<State>
