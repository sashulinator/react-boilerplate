import './modal.scss'

import { useEffect, useLayoutEffect, useRef, useState } from 'react'

import AModal from '~/abstract/modal'
import { AppearFrom } from '~/ui/animation'
import Button from '~/ui/button'
import { Close } from '~/ui/icon'
import { c } from '~/utils/core'
import { stopPropagation } from '~/utils/dom-event'
import { findFirstFocusable } from '~/utils/dom-event/find-first-focusable'
import { fns } from '~/utils/function'
import { useClosing } from '~/utils/hooks'
import { setRefs } from '~/utils/react'

import { getContainerElement } from '../widgets/container'

Modal.displayName = 'ui-Modal'

export interface Props {
  /**
   * Classname
   */
  className?: string

  /**
   * Контент модального окна
   */
  children: React.ReactNode

  /**
   * Контейнер в который будет портировано модальное окно
   */
  containerElement?: Element | undefined

  /**
   * Открыто?
   */
  opened?: unknown

  /**
   * Бэкграунд заблюрен?
   */
  blured?: boolean | undefined

  /**
   * При открытии окна контент изменен быть не может, т.к. при закрытии происходят мелькания
   * этот массив позволяет перерисовывать контент при изменении содержимого массива
   */
  deps?: unknown[]

  /**
   * Фокус на первом фокусироемом элементе
   */
  firstFocused?: boolean

  /**
   * Событие при закрытии окна
   */
  onDismiss?: ((event: React.MouseEvent | MouseEvent | React.KeyboardEvent) => void) | undefined

  /**
   * Событие при клике на кнопку "закрыть"
   */
  onCloseClick?: ((event: React.MouseEvent | MouseEvent | React.KeyboardEvent) => void) | undefined
}

export default function Modal(props: Props): JSX.Element {
  const { blured = true, firstFocused, deps = [] } = props

  const contentRef = useRef<HTMLElement>(null)
  const [children, setChildren] = useState<React.ReactNode>(props.children)
  const [closing, opened] = useClosing(Boolean(props.opened))

  useLayoutEffect(focusFirst, [opened])
  useEffect(preventContentBlinking, [opened, props.opened, ...deps])

  return (
    <AModal
      className={c(props.className, Modal.displayName, blured && `--blured`, closing ? `--closing` : '--opened')}
      containerElement={props.containerElement || getContainerElement() || document.body}
      opened={opened}
      onDismiss={props.onDismiss}
      firstFocused={true}
    >
      <AppearFrom
        duration={closing ? 100 : 200}
        from={{ y: closing ? 0 : 33, opacity: closing ? 0 : 1 }}
        to={{ y: closing ? -33 : 0, opacity: closing ? 1 : 0 }}
        className='wrapper'
      >
        <Button
          round={true}
          height={'l'}
          variant='ghost'
          className='closeButton'
          onClick={fns((e: React.MouseEvent): void => props.onCloseClick?.(e), stopPropagation)}
        >
          <span style={{ transform: 'scale(1.4) translateY(0.1rem)' }}>
            <Close />
          </span>
        </Button>
        {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */}
        <div ref={setRefs(contentRef)} className='content' onClick={(e): void => props.onDismiss?.(e)}>
          {children}
        </div>
      </AppearFrom>
    </AModal>
  )

  // Private

  function focusFirst(): void {
    if (contentRef.current === null) return
    if (firstFocused) findFirstFocusable(contentRef.current)?.focus()
  }

  function preventContentBlinking(): void {
    if (!props.opened) return
    setChildren(props.children)
  }
}
