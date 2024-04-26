import Flex from '~/abstract/flex'
import Button from '~/ui/button'
import { ChevronRight } from '~/ui/icon'
import { ChevronDoubleLeft } from '~/ui/icon/variants/chevron-double-left'
import { ChevronDoubleRight } from '~/ui/icon/variants/chevron-double-right'
import { ChevronLeft } from '~/ui/icon/variants/chevron-left'
import TextInput from '~/ui/text-input'
import { c } from '~/utils/core'
import { parseNum } from '~/utils/number'

import { useInputValue } from '../../../lib/use-input-value'

const displayName = 'ui-Pagination-w-Counter'

export type Props = {
  className?: string
  total?: number | string | undefined
  limit?: number | string | undefined
  page?: number | string | undefined
  onChange?: (num: number) => void
}

export default function Component(props: Props): JSX.Element {
  const [inputValue, onInputChange, onInputKeyUp] = useInputValue(props.page?.toString(), handleChange)

  const total = parseNum(props.total)
  const size = parseNum(props.limit)
  const page = parseNum(props.page)
  const totalPages = Math.ceil(total / size)

  function handleChange(newPage: number) {
    return () => {
      if (newPage !== page && props.onChange && newPage >= 1 && newPage <= totalPages) {
        props.onChange?.(newPage)
      }
    }
  }

  if (page < 1) {
    throw Error('Page cannot be less than 1')
  }

  return (
    <Flex className={c(props.className, displayName)} gap='s' alignItems='center'>
      <Button variant='ghost' height='s' round={true} disabled={props.page === 1} onClick={handleChange(1)}>
        <ChevronDoubleLeft />
      </Button>
      <Button variant='ghost' height='s' round={true} disabled={props.page === 1} onClick={handleChange(page - 1)}>
        <ChevronLeft />
      </Button>
      <TextInput
        onKeyUp={onInputKeyUp}
        onChange={onInputChange}
        height='s'
        style={{ width: '50px', textAlign: 'center' }}
        value={parseNum(inputValue, 0).toString()}
        onFocus={(): void => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
          ;(document.activeElement as any)?.select()
        }}
        autoComplete='off'
      />
      <Button variant='ghost' height='s' round={true} disabled={page >= totalPages} onClick={handleChange(page + 1)}>
        <ChevronRight />
      </Button>
      <Button variant='ghost' height='s' round={true} disabled={page >= totalPages} onClick={handleChange(totalPages)}>
        <ChevronDoubleRight />
      </Button>
    </Flex>
  )
}

Component.displayName = displayName
