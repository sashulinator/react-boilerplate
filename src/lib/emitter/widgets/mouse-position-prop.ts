import { Any, Position } from '~/utils/core'
import { Emitter, Prop } from '~/utils/emitter'

type Props = {
  getScale: () => number
  getTranslate: () => Position
  getElement: () => HTMLElement | null
}

/**
 * @final
 */
export class MousePositionProp<N extends string> extends Prop<N, Position> {
  private getScale: () => number

  private getTranslate: () => Position

  private getElement: () => HTMLElement | null

  constructor(eventName: N, props: Props, emitter: Emitter<Any>) {
    super(eventName, { x: 0, y: 0 }, emitter)

    this.getScale = props.getScale

    this.getTranslate = props.getTranslate

    this.getElement = props.getElement
  }

  subscribe = (): void => {
    document.addEventListener('mousemove', (e) => this.updateMousePosition(e))
    document.addEventListener('mouseenter', (e) => this.updateMousePosition(e))
  }

  unsubscribe = (): void => {
    document.removeEventListener('mousemove', (e) => this.updateMousePosition(e))
    document.removeEventListener('mouseenter', (e) => this.updateMousePosition(e))
  }

  private updateMousePosition(ev: { clientX: number; clientY: number }): void {
    const rect = this.getElement()?.getBoundingClientRect()

    if (!rect) return

    const canvasTranslate = this.getTranslate()
    const scale = this.getScale()

    const x = (ev.clientX - rect.left - canvasTranslate.x) / scale
    const y = (ev.clientY - rect.top - canvasTranslate.y) / scale

    this.set({ x, y })
  }
}
