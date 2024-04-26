import * as Storybook from 'utils/storybook'

import Background from '../'

interface State {
  color: string
  variant: 'cross' | 'dots' | 'line'
  size: string
}

export default {
  getName(): string {
    return Background.displayName || ''
  },

  getDescription(): JSX.Element {
    return (
      <>
        <h1>{this.getName()}</h1>
        Добавьте описание
      </>
    )
  },

  element: function Element(props: Storybook.Props<State>): JSX.Element {
    const { state } = props

    console.log('state', state.variant)

    return <Background {...state} size={parseInt(state.size, 10) || 10} transform={[0, 0, 1]} />
  },

  controls: [
    {
      name: 'color',
      input: 'input',
      defaultValue: 'white',
      width: '200px',
    },
    {
      name: 'bgColor',
      input: 'input',
      defaultValue: 'black',
      width: '200px',
    },
    {
      name: 'size',
      input: 'input',
      defaultValue: '5',
      type: 'number',
      width: '200px',
    },
    {
      name: 'variant',
      input: 'select',
      options: ['dots', 'line', 'cross'],
      defaultValue: 'line',
      style: { width: '200px' },
    },
  ],
} satisfies Storybook.Config<State>
