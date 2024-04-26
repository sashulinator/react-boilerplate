import Flex from '~/abstract/flex'
import Spinner from '~/ui/spinner'
import { c } from '~/utils/core'

import PageCounter, { CounterProps } from '../widgets/counter'
import Paginator from '../widgets/paginator'

const displayName = 'ui-Pagination'

export type Props = CounterProps & {
  className?: string
  total?: number | string | undefined
  limit?: number | string | undefined
  page: number | string | undefined
  loading?: boolean | undefined
  onChange?: (num: number) => void
}

export default function Component(props: Props): JSX.Element {
  const { loading, ...paginatorProps } = props

  return (
    <Flex width='100%' alignItems='center' justifyContent='space-between' className={c(props.className, displayName)}>
      <Flex alignItems='center' margin='0 0 0 var(--l)' gap='l'>
        <Paginator {...paginatorProps} />
        {<Spinner size='s' loading={loading} />}
      </Flex>
      <PageCounter total={props.total} limit={props.limit} />
    </Flex>
  )
}

Component.displayName = displayName
