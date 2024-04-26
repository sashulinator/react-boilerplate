import Flex from '~/abstract/flex'
import { tStrings, useT } from '~/lib/i18n'
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

  const t = useT(tStrings, 't')

  const totalPages = total !== undefined && size !== undefined ? Math.ceil(total / size) : undefined

  return (
    <Flex gap='m' className='info'>
      <div>
        {t.pagination.pages()}: {totalPages ?? '∞'}
      </div>
      <div>
        {t.pagination.items()}: {total ?? '∞'}
      </div>
    </Flex>
  )
}

Component.displayName = displayName
