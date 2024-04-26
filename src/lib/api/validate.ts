import { notify } from '~/shared/notify'
import { isDev, isEmpty } from '~/utils/core'

export function validate(cb: (data: unknown) => unknown, data: unknown, name?: string): void {
  if (isDev()) {
    const errors = cb(data)
    if (!isEmpty(errors)) {
      notify({ data: 'Ошибка валидации', type: 'error' })
      console.log(`validation error '${name}'`, errors)
    }
  }
}
