import * as Storybook from 'utils/storybook'

import Flex from '~/abstract/flex'
import { H1 } from '~/ui/heading'
import Pagination from '~/ui/pagination'
import { useAsync } from '~/utils/hooks'

interface State {
  page: number
}

export default {
  getName: (): string => Pagination.displayName,

  getDescription: function Description(): JSX.Element {
    return (
      <>
        <H1>{Pagination.displayName}</H1>
        Пагинация
      </>
    )
  },

  element: function Element(props: Storybook.Props<State>): JSX.Element {
    const { state, setState } = props

    const loader = useAsync('', () => new Promise((resolve) => setTimeout(resolve, 777)), {
      dependencies: [state.page],
    })

    return (
      <Flex dir='column' gap='xl' width='100%'>
        <Pagination onChange={(page): void => setState((s) => ({ ...s, page }))} {...state} />
        {loader.isPending ? 'loading...' : 'done'}
      </Flex>
    )
  },

  controls: [
    {
      name: 'page',
      input: 'input',
      defaultValue: 1,
      width: '200px',
      type: 'number',
    },
    {
      name: 'total',
      input: 'input',
      defaultValue: undefined,
      width: '200px',
      type: 'number',
    },
    {
      name: 'limit',
      input: 'input',
      defaultValue: undefined,
      width: '200px',
      type: 'number',
    },
  ],
} satisfies Storybook.Config<State>
