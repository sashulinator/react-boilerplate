import * as Storybook from 'utils/storybook'

import { H1 } from '~/ui/heading'
import Link from '~/ui/link'

interface State {
  disabled: boolean
  size: 's' | 'm' | 'l'
}

export default {
  getName: (): string => Link.displayName || '',

  getDescription: function Description(): JSX.Element {
    return (
      <>
        <H1>{Link.displayName}</H1>
        Добавьте описание
      </>
    )
  },

  element: function Element(props: Storybook.Props<State>): JSX.Element {
    const { state } = props

    return (
      <Link to='#' {...state}>
        Link
      </Link>
    )
  },

  controls: [
    {
      name: 'height',
      input: 'select',
      options: ['s', 'm', 'l'],
      defaultValue: 's',
      style: { width: '200px' },
    },
    {
      name: 'buttonVariant',
      input: 'select',
      options: [undefined, 'primary', 'ghost', 'regular'],
      defaultValue: undefined,
      style: { width: '200px' },
    },
    { name: 'disabled', input: 'checkbox', defaultValue: false },
    { name: 'round', input: 'checkbox', defaultValue: false },
    { name: 'square', input: 'checkbox', defaultValue: false },
  ],
} satisfies Storybook.Config<State>
