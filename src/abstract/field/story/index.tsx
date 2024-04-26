import './styles.scss'

import * as Storybook from 'utils/storybook'

import Field, { Props } from '../ui/field'

interface State {
  isFocused: boolean
  isError: boolean
  disabled: boolean
  hidden: boolean
  transparent: boolean
  isLoading: boolean
  height: string
}

export default {
  getName: (): string => Field.displayName,

  getDescription: function Description(): JSX.Element {
    return (
      <>
        <h1>{this.getName()}</h1>
        Добавьте описание
      </>
    )
  },

  element: function Element(props: Storybook.Props<State>): JSX.Element {
    const {
      state: { transparent, ...restState },
    } = props

    const variant: Props['variant'] = []
    if (transparent) variant.push('transparent')

    return (
      <div style={{ padding: '2rem' }}>
        <Field className='Storybook' {...restState} variant={variant}>
          allo
        </Field>
      </div>
    )
  },

  controls: [
    { name: 'isFocused', input: 'checkbox', defaultValue: false },
    { name: 'isError', input: 'checkbox', defaultValue: false },
    { name: 'hidden', input: 'checkbox', defaultValue: false },
    { name: 'disabled', input: 'checkbox', defaultValue: false },
    { name: 'isLoading', input: 'checkbox', defaultValue: false },
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
