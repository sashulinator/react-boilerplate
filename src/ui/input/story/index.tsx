import * as Storybook from 'utils/storybook'

import Flex from '~/abstract/flex'
import Button from '~/ui/button'
import { H1 } from '~/ui/heading'
import Input, { DisplayProps } from '~/ui/input'
import Paragraph from '~/ui/paragraph/ui/paragraph'

const options = [
  { value: 'number', display: 'число' },
  { value: 'string', display: 'строка' },
  { value: 'boolean', display: 'логическое' },
]

type State = {
  isFocused: boolean
  isError: boolean
  disabled: boolean
  hidden: boolean
  transparent: boolean
  height: 's' | 'm' | 'l'
  value: string
}

export default {
  getName: (): string => Input.displayName,

  getDescription: function Description(): JSX.Element {
    return (
      <>
        <H1>{Input.displayName}</H1>
        <Paragraph>Обертка позволяющая создавать кастомные инпуты</Paragraph>
        <Paragraph>Позволяет делигировать логику фокуса, дисейблинга и изменения значения</Paragraph>
      </>
    )
  },

  element: function Element(props: Storybook.Props<State>): JSX.Element {
    const { state, setState } = props

    return (
      <Input
        {...state}
        onChange={(e, value): void => setState((s) => ({ ...s, value }))}
        renderDisplay={RenderDisplay}
        displayProps={state}
        style={{ maxWidth: 'fit-content' }}
      />
    )
  },

  controls: [
    { name: 'value', input: 'input', defaultValue: 'number' },
    { name: 'isFocused', input: 'checkbox', defaultValue: false },
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

function RenderDisplay(props: DisplayProps<string, State>): JSX.Element {
  return (
    <Flex>
      {options.map((option) => {
        return (
          <Button
            height={props.height}
            onClick={(): void => props.setValue(option.value)}
            key={option.value}
            style={{ color: option.value === props.value ? 'red' : undefined, width: '100%' }}
          >
            {option.display}
          </Button>
        )
      })}
    </Flex>
  )
}
