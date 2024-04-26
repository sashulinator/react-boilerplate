import { createPortal } from 'react-dom'
import * as Storybook from 'utils/storybook'

import Flex from '~/abstract/flex'
import { Controller } from '~/abstract/notification'
import { Position } from '~/abstract/notification/controller'
import { H1 } from '~/ui/heading'
import { EmitterDictionary } from '~/utils/emitter'

import List from '../variants/list'
import DefaultNotification from '../variants/status'

interface State {
  limit: string
  type: 'succes' | 'error' | 'unknown'
}

const list = new EmitterDictionary<Controller>([], (item) => item.id)

export default {
  getName: (): string => List.displayName,

  getDescription: function Description(): JSX.Element {
    return (
      <>
        <H1>{this.getName()}</H1>
        Добавьте описание
      </>
    )
  },

  element: function Element(props: Storybook.Props<State>): JSX.Element {
    const { state } = props

    function create(position: Position): void {
      list.add(new Controller({ type: state.type, data: 'hello world', position }))
    }

    return (
      <Flex dir='column' gap='xl' width='100%'>
        <button onClick={(): void => create('bottom-left')}>bottom-left</button>
        <button onClick={(): void => create('bottom-right')}>bottom-right</button>
        <button onClick={(): void => create('top-right')}>top-right</button>
        <button onClick={(): void => create('top-left')}>top-left</button>
        <button onClick={(): void => create('bottom-center')}>bottom-center</button>
        <button onClick={(): void => create('top-center')}>top-center</button>
        {createPortal(
          <List
            style={{ zIndex: 10 }}
            limit={parseInt(state.limit, 10)}
            list={list}
            renderItem={DefaultNotification}
          />,
          document.body
        )}
      </Flex>
    )
  },

  controls: [
    {
      name: 'limit',
      input: 'input',
      defaultValue: 3,
    },
    {
      name: 'type',
      input: 'select',
      options: ['error', 'success', 'unknown'],
      defaultValue: 'success',
      style: { width: '200px' },
    },
  ],
} satisfies Storybook.Config<State>
