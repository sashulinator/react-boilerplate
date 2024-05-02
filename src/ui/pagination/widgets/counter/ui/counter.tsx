import Flex from '~/abstract/flex'
import { parseNum } from '~/utils/number'

const displayName = 'ui-Pagination-w-Paginator'

export type Props = {
  loading?: boolean | undefined
  total?: number | string | undefined
  limit?: number | string | undefined
}

export default function Component(props: Props): JSX.Element {
  const total = parseNum(props.total)
  const size = parseNum(props.limit)

  const totalPages = total !== undefined && size !== undefined ? Math.ceil(total / size) : undefined

  return (
    <Flex gap='m' className='info'>
      <div>pages: {totalPages ?? '∞'}</div>
      <div>items: {total ?? '∞'}</div>
    </Flex>
  )
}

Component.displayName = displayName
