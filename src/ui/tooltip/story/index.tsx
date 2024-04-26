import { useEffect, useState } from 'react'
import * as Storybook from 'utils/storybook'

import Flex from '~/abstract/flex'
import Button from '~/ui/button'
import { H1 } from '~/ui/heading'
import Tooltip, { Point } from '~/ui/tooltip'

interface State {
  delay: number
  points: Point | undefined
}

export default {
  getName: (): string => Tooltip.displayName,

  getDescription: function Description(): JSX.Element {
    return (
      <>
        <H1>{Tooltip.displayName}</H1>
        Добавьте описание
      </>
    )
  },

  element: function Element(props: Storybook.Props<State>): JSX.Element {
    const [count, setCount] = useState(0)

    useEffect(() => {
      setTimeout(() => {
        setCount(count + 1)
      }, 1000)
    }, [])

    const { state } = props

    return (
      <Flex dir='column' gap='xl' width='100%'>
        <Tooltip contents={'World'} {...state}>
          <Button variant='primary' onClick={(): void => setCount(count + 1)}>
            Rerender ({count})
          </Button>
        </Tooltip>

        <Tooltip contents={'World'} {...state}>
          <button ref={console.log} onClick={(): void => setCount(count + 1)}>
            Rerender ({count})
          </button>
        </Tooltip>
      </Flex>
    )
  },

  controls: [
    {
      name: 'placement',
      input: 'select',
      options: ['bc', 'bl', 'br', 'tc', 'tl', 'tr', 'cc', 'cl', 'cr'],
      defaultValue: 'tc',
      style: { width: '200px' },
    },
    {
      name: 'delay',
      input: 'input',
      defaultValue: 300,
      width: '200px',
      type: 'number',
    },
  ],
} satisfies Storybook.Config<State>
