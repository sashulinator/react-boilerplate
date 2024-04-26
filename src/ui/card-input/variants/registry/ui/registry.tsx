import { ReactNode } from 'react'

import Flex from '~/abstract/flex'
import Button from '~/ui/button'
import { Refresh } from '~/ui/icon'
import { Registry as RegistryModal } from '~/ui/modal'
import Tooltip from '~/ui/tooltip'
import { Dictionary, c } from '~/utils/core'
import { stopPropagation } from '~/utils/dom-event'
import { fns } from '~/utils/function'

import CardInput, { Props as CardInputProps, DisplayProps } from '../../../ui/card-input'

export interface Props<V, P extends Dictionary> extends CardInputProps<V, P> {
  className?: string | undefined
  modalDeps?: unknown[] | undefined
  fetcher?: {
    isFetching?: boolean
    isError?: boolean
    isSuccess?: boolean
    refetch?: () => void
  }
}

const displayName = 'ui-CardInput-v-Registry'

/**
 * Registry
 */
export default function Component<V, P extends Dictionary>(props: Props<V, P>): JSX.Element {
  const { renderDisplay, fetcher, modalDeps = [], displayProps, isLoading, ...cardInputProps } = props

  return (
    <CardInput
      {...cardInputProps}
      className={c(displayName, props.className)}
      height={null}
      isLoading={fetcher?.isFetching || isLoading}
      renderDisplay={(): ReactNode => {
        return (
          <Flex style={{ minHeight: '4rem' }} width='calc(100% - 1.5em)' crossAxis='center' padding='0.5rem 0'>
            {fetcher?.isError && (
              <Flex crossAxis='center' gap='m'>
                <Tooltip
                  contents={
                    <div style={{ width: 'max-content' }}>
                      Не удалось загрузить
                      <br />
                      Обновить
                    </div>
                  }
                >
                  <Button
                    variant='primary'
                    height='s'
                    round={true}
                    onClick={fns(stopPropagation, (): unknown => fetcher?.refetch?.())}
                  >
                    <Refresh />
                  </Button>
                </Tooltip>
              </Flex>
            )}
            {/* eslint-disable-next-line @typescript-eslint/no-unsafe-argument*/}
            {fetcher?.isSuccess &&
              props.value !== undefined &&
              renderDisplay({ value: cardInputProps.value, ...displayProps } as DisplayProps<V, P>)}
            {!props.value && <span style={{ opacity: '0.5' }}>Не выбрано</span>}
          </Flex>
        )
      }}
    >
      {({ setOpen, setValue, isOpen }): JSX.Element => {
        return (
          <RegistryModal
            deps={[props.value, ...modalDeps]}
            opened={isOpen}
            onCloseClick={fns(stopPropagation, () => setOpen(false))}
          >
            {props.children({ setOpen, setValue, isOpen })}
          </RegistryModal>
        )
      }}
    </CardInput>
  )
}

Component.displayName = displayName
