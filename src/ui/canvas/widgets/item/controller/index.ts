import { PositionProp } from '~/lib/emitter'
import { Id, Position, assertDefined, assertNotNull } from '~/utils/core'
import { Size, getComputedSize } from '~/utils/dom'
import { Emitter, Prop } from '~/utils/emitter'

export type Events = {
  update: undefined

  /**
   * HTMLDivElement
   */
  ref: { value: null | HTMLDivElement }

  /**
   * Позиция на канве
   */
  position: { value: Position; previous: Position }
}

export interface Props {
  /**
   * Идентификатор
   */
  id: Id

  /**
   * Позиция на канве
   */
  position: Position
}

export abstract class Controller<E extends Events = Events> extends Emitter<E> {
  /**
   * Идентификатор
   */
  id: Id

  /**
   * HTMLDivElement
   */
  ref: Prop<'ref', Events['ref']['value']>

  /**
   * Позиция на канве
   */
  position: PositionProp<'position'>

  constructor(props: Props) {
    super()

    this.id = props.id

    this.ref = new Prop('ref', null as Events['ref']['value'], this)

    this.position = new PositionProp('position', props.position, this)
  }

  get size(): Size {
    assertNotNull(this.ref.value)
    return getComputedSize(this.ref.value)
  }

  abstract serialize(): Props

  patch(props: Record<string, unknown>): void {
    const entries = Object.entries(props)
    for (let index = 0; index < entries.length; index++) {
      const [key, value] = entries[index]
      assertDefined(this[key])
      this[key as 'position'].set(value as Position)
    }
  }
}
