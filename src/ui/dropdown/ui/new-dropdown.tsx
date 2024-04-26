import { useState } from 'react'

import Flex from '~/abstract/flex'
import { DropdownItem, DropdownItemProps } from '~/ui/dropdown-list'
import DropdownList, { DropdownListProps } from '~/ui/dropdown-list/ui/dropdown-list'
import { ChevronRight } from '~/ui/icon'
import { Key } from '~/ui/old-list'
import TextInput, { TextInputProps } from '~/ui/text-input'
import { preventDefault, stopPropagation } from '~/utils/dom-event'
import { fns } from '~/utils/function'

import Dropdown from './dropdown'

export interface Props<T> extends Omit<TextInputProps, 'onChange'> {
  className?: string | undefined
  options: T[]
  isAutocomplete?: boolean | undefined
  onChange?: ((e: { target: { value: Key | undefined } }, value: Key | undefined) => void) | undefined

  /**
   * Уникаланый ключ React
   */
  getItemKey: (item: T | undefined, data: T[]) => Key

  /**
   * Используется при поиске
   */
  getItemString: (item: T, data: T[]) => Key

  isLoading?: boolean | undefined
}

const displayName = 'ui-NewDropdown'

/**
 * Dropdown
 */
export default function Component<T>(props: Props<T>): JSX.Element {
  const { options, onChange, getItemString, getItemKey, isAutocomplete, ...inputProps } = props

  const [checked, setChecked] = useState<Key[]>([])
  const [selected, setSelected] = useState<Key[]>([])
  const [isOpen, setOpen] = useState(false)

  const itemValue = props.options?.find((item) => getItemKey(item, options) === props.value)

  return (
    <Dropdown<TextInputProps, DropdownListProps<T, DropdownItemProps<T, unknown>>>
      {...inputProps}
      right={
        <Flex
          padding='0 var(--m) 0 0 '
          onClick={fns<[React.MouseEvent]>(preventDefault, stopPropagation, () => setOpen(true))}
        >
          <span style={{ transform: 'rotate(90deg)' }}>
            <ChevronRight />
          </span>
        </Flex>
      }
      readOnly={inputProps.readOnly || !isAutocomplete}
      isOpen={isOpen}
      value={getItemString(itemValue as T, props.options) || ''}
      renderInput={TextInput}
      setOpen={setOpen}
      clearValue={(): void => setChecked([])}
      renderList={DropdownList}
      listProps={{
        getItemString: props.getItemString,
        rootProps: {
          style: {
            backgroundColor: 'var(--bgSecondary)',
            border: '1px solid var(--bgSecondary)',
            boxShadow: '0px 1.2px 18px rgba(0, 0, 0, 0.15), 0px 6.4px 29px rgba(0, 0, 0, 0.15)',
            maxHeight: '150px',
            overflow: 'auto',
            borderRadius: '8px',
            padding: '12px 0',
            zIndex: 9999,
          },
        },
        offset: [12, 5],
        data: options,
        selected,
        checked,
        getItemKey,
        filter: (item, sq) => (sq ? new RegExp(sq, 'gi').test(getItemString(item, options).toString()) : true),
        renderItem: DropdownItem,
        onSelectOne: (k) => {
          setSelected([k])
        },
        onUnselectOne: () => setSelected([]),
        onCheckOne: (k) => {
          setChecked(() => [k])
          onChange?.({ target: { value: k } }, k)
        },
      }}
    />
  )
}

Component.displayName = displayName
