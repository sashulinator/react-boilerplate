import { animate } from '~/utils/animate'
import { Any, Position } from '~/utils/core'
import { Emitter, Events, Prop } from '~/utils/emitter'

export interface PositionPropNewEvent {
  last: boolean
  value: Position
}

/**
 * @final
 */
export class PositionPropNew<N extends string> extends Prop<N, Position> {
  start: Position

  constructor(eventName: N, value: Position, emitter: Emitter<Any>) {
    super(eventName, value, emitter)

    this.start = value

    this.emitter.on(this.eventName as '', (event: PositionPropNewEvent) => {
      const last = event.last ?? true
      if (!last) return
      this.start = event.value
    })
  }

  set = (value: Position, event: Record<string, unknown> & { last?: boolean } = {}): void => {
    const { last = true, ...restEvent } = event
    const x = Math.round(value.x)
    const y = Math.round(value.y)

    if (last) {
      this.transitionMove({ x, y }, restEvent)
      this.start = value
    } else {
      this.emitter.emit(this.eventName, { value, previous: { ...this.value }, ...event })
    }
  }

  private transitionMove = (position: Position, event?: Events): void => {
    const delta: Position = { x: this.value.x - position.x, y: this.value.y - position.y }
    const fromPosition: Position = { ...this.value }

    animate(250, (progress) => {
      const x = Math.round(fromPosition.x - delta.x * progress)
      const y = Math.round(fromPosition.y - delta.y * progress)
      const last = progress === 1
      this.emitter.emit(this.eventName, { value: { x, y }, previous: { ...this.value }, last, ...event })
    })
  }
}
