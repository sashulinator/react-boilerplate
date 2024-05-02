import { notify } from '~/shared/notify'

export function notifyDevError(e: unknown, showStack = false): void {
  // Делаем через setTimeout так как некоторые ошибки могут вылететь до
  // того как отрисуется контейнер для нотификаций
  setTimeout(() => {
    if (e instanceof Error) {
      notify({ type: 'error', data: `DEV: ${e.message}` })
      console.log('------------ DEV ERROR ------------')
      console.error(showStack ? e : e.message)
      console.log({ ...e })
      console.log('-----------------------------------')
    }
  })
}
