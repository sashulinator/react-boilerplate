import Flex from '~/abstract/flex'
import { Search } from '~/ui/text-input'
import { c } from '~/utils/core'

import Pagination, { Props as PaginationProps } from '../../../ui/pagination'

export interface Props extends PaginationProps {
  searchQuery: string
  searchQueryPlaceholder?: string | undefined
  onSearchQueryChange: React.ChangeEventHandler<HTMLInputElement> | undefined
}

const displayName = 'ui-Pagination-v-Searchable'

/**
 * Searchable
 */
export default function Component(props: Props): JSX.Element {
  const { searchQuery, onSearchQueryChange, searchQueryPlaceholder, ...paginationProps } = props
  return (
    <Flex className={c(props.className, displayName)} width='100%' dir='column' gap='xxxl'>
      <Search value={searchQuery} onChange={onSearchQueryChange} placeholder={searchQueryPlaceholder} />
      <Pagination {...paginationProps} />
    </Flex>
  )
}

Component.displayName = displayName
