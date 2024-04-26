import * as Storybook from 'utils/storybook'

import Flex from '~/abstract/flex'

import Field, { Props } from '../ui/field'

interface State {
  isFocused: boolean
  isError: boolean
  disabled: boolean
  hidden: boolean
  transparent: boolean
  insetFocus: boolean
  isLoading: boolean
  height: 's' | 'm' | 'l'
}

export default {
  getName: (): string => Field.displayName,

  getDescription: function Description(): JSX.Element {
    return (
      <>
        <h1>{this.getName()}</h1>A basic widget for getting and displaying the user input
      </>
    )
  },

  element: function Element(props: Storybook.Props<State>): JSX.Element {
    const {
      state: { transparent, insetFocus, ...restState },
    } = props

    const variant: Props['variant'] = []
    if (transparent) variant.push('transparent')
    if (insetFocus) variant.push('insetFocus')

    const children = (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        Hello World
      </div>
    )

    return (
      <Flex dir='column' width='100%' padding='3rem' style={{ border: '1px solid red' }}>
        <Field {...restState} variant={variant}>
          {children}
        </Field>
        <br />
        focused
        <Field isFocused={true} height={restState.height}>
          {children}
        </Field>
        <br />
        focused insetFocus
        <Field isFocused={true} height={restState.height} variant={['insetFocus']}>
          {children}
        </Field>
        <br />
        error
        <Field isError={true} height={restState.height}>
          {children}
        </Field>
        <br />
        disabled
        <Field disabled={true} height={restState.height}>
          {children}
        </Field>
        isLoading
        <Field isLoading={true} height={restState.height}>
          {children}
        </Field>
        transparent
        <Field height={restState.height} variant={['transparent']}>
          {children}
        </Field>
      </Flex>
    )
  },

  controls: [
    { name: 'isFocused', input: 'checkbox', defaultValue: false },
    { name: 'isError', input: 'checkbox', defaultValue: false },
    { name: 'hidden', input: 'checkbox', defaultValue: false },
    { name: 'disabled', input: 'checkbox', defaultValue: false },
    { name: 'isLoading', input: 'checkbox', defaultValue: false },
    { name: 'transparent', input: 'checkbox', defaultValue: false },
    { name: 'insetFocus', input: 'checkbox', defaultValue: false },
    {
      name: 'height',
      input: 'select',
      options: ['s', 'm', 'l'],
      defaultValue: 'l',
      style: { width: '200px' },
    },
  ],
} satisfies Storybook.Config<State>
