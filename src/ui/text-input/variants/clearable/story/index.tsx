import { useState } from 'react'
import * as Storybook from 'utils/storybook'

import Clearable, { Props } from '../ui/clearable'

interface State {
  isFocused: boolean
  isError: boolean
  disabled: boolean
  hidden: boolean
  transparent: boolean
  height: 's' | 'm' | 'l'
}

export default {
  getName: (): string => Clearable.displayName || '',

  getDescription: function Description(): JSX.Element {
    return (
      <>
        <h1>{this.getName()}</h1>
        Добавьте описание
      </>
    )
  },

  element: function Element(props: Storybook.Props<State>): JSX.Element {
    const [value, setValue] = useState('')

    const {
      state: { transparent, ...restState },
    } = props

    const variant: Props['variant'] = []
    if (transparent) variant.push('transparent')

    return <Clearable {...restState} value={value} onChange={(e): void => setValue(e.target.value)} />
  },

  controls: [
    { name: 'isError', input: 'checkbox', defaultValue: false },
    { name: 'hidden', input: 'checkbox', defaultValue: false },
    { name: 'disabled', input: 'checkbox', defaultValue: false },
    { name: 'transparent', input: 'checkbox', defaultValue: false },
    {
      name: 'height',
      input: 'select',
      options: ['s', 'm', 'l'],
      defaultValue: 's',
      style: { width: '200px' },
    },
  ],
} satisfies Storybook.Config<State>

/**
 * Private
 */
