import { createElement } from 'react'

import Flex, { FlexProps } from '~/abstract/flex'
import { Id, c } from '~/utils/core'

export interface Props<I> extends Omit<FlexProps, 'children'> {
  data: I[]
  children: (props: { item: I; index: number }) => JSX.Element
}

const displayName = 'ui-Item-v-List'

/**
 * List
 * В дальнейшем тут будет слушатель клавиш
 */
export default function Component<I extends { id: Id }>(props: Props<I>): JSX.Element {
  const { data, children, className, ...flexProps } = props

  return (
    <Flex dir='column' gap='m' {...flexProps} className={c(className, displayName)}>
      {data.map((item, index) => createElement(children, { key: item.id, item, index }))}
    </Flex>
  )
}

Component.displayName = displayName
