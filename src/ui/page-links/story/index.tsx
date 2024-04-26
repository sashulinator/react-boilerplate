import * as Storybook from 'utils/storybook'

import Flex from '~/abstract/flex'
import { H1 } from '~/ui/heading'
import Labeled from '~/ui/labeled'
import OrderedList from '~/ui/page-links'

export default {
  getName: (): string => OrderedList.displayName || '',

  getDescription: function Description(): JSX.Element {
    return (
      <>
        <H1>{Labeled.displayName}</H1>
        Добавьте описание
      </>
    )
  },

  element: function Element(): JSX.Element {
    return (
      <Flex dir='column' gap='xl' width='100%'>
        <OrderedList items={[['hello', <div key='1'>hello</div>]]} />
      </Flex>
    )
  },

  controls: [],
} satisfies Storybook.Config<unknown>
