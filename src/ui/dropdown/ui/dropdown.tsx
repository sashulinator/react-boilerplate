import { ForwardedRef, createElement, forwardRef, useRef, useState } from 'react'

import { Any } from '~/utils/core'
import { useControlledState, useEventListener, useOnClickOutside } from '~/utils/hooks'
import { setRefs } from '~/utils/react'

import { DropdownProps } from '../types/dropdown-props'
import { InputRenderProps } from '../types/input-render'

/**
 * The `Dropdown` component, which displays a list of options to select from.
 *
 * @template I - The props for rendering the input element.
 * @template LP - The props for rendering the list element.
 *
 * @param {DropdownProps<I, LP>} props - The props to configure the dropdown component.
 *
 * @returns {JSX.Element} - A `Dropdown` JSX element.
 */

function Dropdown<I extends InputRenderProps, LP extends { filter?: ((...a: Any[]) => Any) | undefined }>(
  props: DropdownProps<I, LP>,
  ref: ForwardedRef<HTMLInputElement>
): JSX.Element {
  const {
    renderInput,
    renderList,
    listProps,
    clearValue,
    isOpen: isOpenProp,
    setOpen: setOpenProp,
    ...textInputProps
  } = props
  const [inputElement, setInputElement] = useState<null | HTMLInputElement>(null)
  const [isOpen, setOpen] = useControlledState(false, isOpenProp, setOpenProp)
  const [searchQuery, setSearchQuery] = useState('')
  const listRef = useRef<HTMLElement>(null)

  useOnClickOutside(listRef, (e) => {
    if (!inputElement?.contains(e.target as HTMLElement)) {
      setOpen(false)
    }
  })

  useEventListener('keydown', (e) => {
    if (
      e.key === 'Escape' &&
      (listRef.current?.contains(document.activeElement) || document.activeElement === inputElement)
    ) {
      setOpen(false)
      inputElement?.focus()
    }
  })

  return (
    <>
      {createElement(renderInput, {
        autoComplete: 'off',
        ...textInputProps,
        value: searchQuery || props.value,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
        readOnly: !listProps.filter || (textInputProps as any).readOnly,
        ref: setRefs(setInputElement, ref),
        onClick: onInputClick,
        onChange: onInputChange,
        onKeyDown: onInputKeyDown,
      })}
      {inputElement &&
        createElement(renderList, {
          ...listProps,
          ref: listRef,
          inputElement,
          isOpen,
          searchQuery,
          setSearchQuery,
          setOpen,
        })}
    </>
  )

  // Private

  // function handleClickOutside(event: MouseEvent | TouchEvent) {
  //   if (isElement(event.target) && inputRef?.current?.contains(event.target)) {
  //     return
  //   }
  //   close()
  // }

  function onInputChange(e: React.ChangeEvent<HTMLInputElement>): void {
    // listProps.setSelected(null)
    setSearchQuery(e.target.value)
    setOpen(true)
    props.onChange?.(e)
    clearValue()
  }

  function onInputClick(e: React.MouseEvent<HTMLInputElement>): void {
    if (isOpen) {
      setOpen(false)
    } else {
      setOpen(true)
    }

    textInputProps?.onClick?.(e)
    props.onClick?.(e)
  }

  function onInputKeyDown(e: React.KeyboardEvent<HTMLInputElement>): void {
    if (e.key === ' ') {
      if (isOpen) {
        setOpen(false)
      } else {
        setOpen(true)
        setTimeout(() => {
          listRef.current?.focus()
        }, 0)
      }
    }

    if (e.key === 'ArrowDown') {
      // Для предотвращения нежелательного после фокуса, запускаем через таймаут
      setTimeout(() => listRef.current?.focus())
    }
    props.onKeyDown?.(e)
  }
}

export default forwardRef(Dropdown) as <
  I extends InputRenderProps,
  LP extends { filter?: ((...a: Any[]) => Any) | undefined },
>(
  props: DropdownProps<I, LP>,
  ref: ForwardedRef<HTMLInputElement>
) => JSX.Element
