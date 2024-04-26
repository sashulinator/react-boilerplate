import { Id, generateId } from '~/utils/core'
import { Emitter, Prop } from '~/utils/emitter'

export type Status = 'enter' | 'exit' | 'exited' | 'visible' | 'stoped'
export type Position = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top-center' | 'bottom-center'

export type Events = {
  status: { value: Status }
  type: { value: string }
  data: { value: React.ReactNode }
}

export interface Props {
  id?: Id | undefined
  type: string
  data: React.ReactNode
  position?: Position | undefined
  visibleTransitionLimit?: number | undefined
}

export class Controller extends Emitter<Events> {
  id: Id

  position: Position

  visibleTransitionLimit: number

  data: Prop<'data', React.ReactNode>

  status: Prop<'status', Status>

  type: Prop<'type', string>

  // Счетчик времени сколько сообщение показывается пользователю
  visibleTransition: Prop<'visibleTransition', number>

  constructor(props: Props) {
    super()

    this.id = props.id ?? generateId()

    this.visibleTransitionLimit = props.visibleTransitionLimit || 5000

    this.position = props.position || 'bottom-left'

    this.status = new Prop('status', 'enter' as Status, this)

    this.data = new Prop('data', props.data, this)

    this.type = new Prop('type', props.type, this)

    this.visibleTransition = new Prop('visibleTransition', 0, this)
  }

  serialize(): Required<Props> & { status: Status; visibleTransition: number } {
    return {
      id: this.id,
      visibleTransitionLimit: this.visibleTransitionLimit,
      data: this.data.value,
      position: this.position,
      type: this.type.value,
      //
      status: this.status.value,
      visibleTransition: this.visibleTransition.value,
    }
  }

  setVisible(): void {
    // Часто бывает логика что при наведении курсора на нотификашку мы останавливаем счетчик visible
    // а когда убираем курсор то возобновляем
    // По клику часто убираем нотификашку но тогда срабатывает событие ухода курсора
    // и нотификашка возвращается обратно
    if (this.status.value === 'exit') return
    this.status.set('visible')
    this.transitVisible()
  }

  setExit(): void {
    this.status.set('exit')
    this.visibleTransition.set(this.visibleTransitionLimit)
  }

  transitVisible(): void {
    const startDate = new Date().getTime()
    // Транзишн может быть поставлен на паузу и возобновлен, поэтому не всегда начинается с 0
    const startTransition = this.visibleTransition.value

    setTimeout(() => {
      if (this.status.value !== 'visible') return

      const current = new Date().getTime()
      const delta = current - startDate
      this.visibleTransition.set(startTransition + delta)

      if (this.visibleTransition.value > this.visibleTransitionLimit) {
        this.status.set('exit')
      } else {
        this.transitVisible()
      }
    }, 10)
  }
}
