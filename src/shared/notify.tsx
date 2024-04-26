import Flex from '~/abstract/flex'
import { Controller, ControllerProps } from '~/abstract/notification'
import Spinner from '~/ui/spinner'
import { generateId } from '~/utils/core'
import { EmitterDictionary } from '~/utils/emitter'

export const list = new EmitterDictionary<Controller>([], (item) => item.id)

/**
 * Вывести toast
 * TODO браться должен из ui где должный быть сужены типы тостов
 */
export function notify(props: Omit<ControllerProps, 'type'> & { type?: string }): void {
  if (props?.id && list.items[props?.id]) {
    list.update(new Controller({ type: 'unknown', ...props }))
  } else {
    list.add(new Controller({ type: 'unknown', ...props }))
  }
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function createAsyncNotifier(): {
  onStart: typeof notify
  onSuccess: typeof notify
  onError: typeof notify
} {
  const id = generateId()

  return {
    onStart: (props: Partial<ControllerProps>): void => {
      notify({
        id,
        visibleTransitionLimit: Infinity,
        ...props,
        type: 'info',
        data: (
          <Flex height='0.7rem' width='100%' mainAxis='space-between'>
            {(props?.data as string) || 'Обновление'}
            <Spinner size='s' />
          </Flex>
        ),
      })
    },
    onSuccess: (props: Partial<ControllerProps>): void => {
      notify({
        id,
        data: 'Успешно',
        type: 'success',
        visibleTransitionLimit: 1000,
        ...props,
      })
    },
    onError: (props: Partial<ControllerProps>): void => {
      notify({
        id,
        data: 'Ошибка',
        type: 'error',
        visibleTransitionLimit: 5000,
        ...props,
      })
    },
  }
}
