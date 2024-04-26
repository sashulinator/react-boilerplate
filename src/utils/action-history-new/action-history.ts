import { Dictionary, Id, generateId } from '../core'
import { Emitter } from '../emitter'
import { Action } from './types/step'

export type HistoryEvents = {
  add: Dictionary
  redo: undefined
  undo: undefined
}

export type Dispatchers<TMap extends Record<string, unknown>> = {
  [K in keyof TMap]: (payload: TMap[K]) => void
}

export interface Props<TMap extends Record<string, unknown>> {
  actions?: Action<TMap>[]
  dispatchers: { [K in keyof TMap]: (payload: TMap[K]) => void }
}

type Events<TMap extends Record<string, unknown>> = { add: Action<TMap>; applyAction: Action<TMap> }

export class ActionHistory<TMap extends Record<string, unknown>> {
  actions: Action<TMap>[]

  dispatchers: { [K in keyof TMap]: (payload: TMap[K]) => void }

  _emitter: Emitter<Dictionary>

  constructor(props: Props<TMap>) {
    this.actions = props.actions || []
    this.dispatchers = props.dispatchers
    this._emitter = new Emitter()
  }

  addAction(action: Omit<Action<TMap>, 'id'> & { id?: Id }) {
    this._emitter.emit('add', action)

    const lastStep = this.actions[0]

    if (lastStep && !lastStep.done) {
      const index = this.actions.findIndex((step) => step.done)
      if (index === -1) {
        this.actions = []
      } else {
        this.actions = this.actions.slice(index)
      }
    }

    this.actions.unshift({ id: action.id ?? generateId(), ...action })
  }

  findCurrent(): Action<TMap> | undefined {
    return this.actions.find((item) => item.done)
  }

  findNext(): Action<TMap> | undefined {
    for (let i = 0; i < this.actions.length; i++) {
      const action = this.actions[i]
      const nextItem = this.actions[i + 1]
      const isLast = i === this.actions.length - 1
      // Если первый и второй done то next не существует
      if (i === 0 && action?.done && nextItem?.done) return undefined
      // Если следующий done значит он current, а этот next
      if (nextItem?.done) return action
      // Если все элементы не done, то последний next
      if (isLast) return action
    }
  }

  findPrevious(): Action<TMap> | undefined {
    return this.actions.find((_, i) => this.actions[i - 1]?.done)
  }

  applyAction = (action: Action<TMap>): void => {
    this._emitter.emit('applyAction', action)

    const steps = action.done ? action.undos : action.redos

    for (let index = 0; index < steps.length; index++) {
      const step = steps[index]
      this.dispatchers[step.type]?.(step.payload)
    }

    action.done = !action.done
  }

  undo = (): void => {
    this._emitter.emit('undo')
    const current = this.findCurrent()
    if (!current) return
    this.applyAction(current)
  }

  redo = (): void => {
    this._emitter.emit('redo')
    const next = this.findNext()
    if (!next) return
    if (next.done) return
    this.applyAction(next)
  }

  commit = (action: Omit<Action<TMap>, 'id' | 'done'> & { id?: Id }): void => {
    this.addAction({ ...action, done: false })
    this.redo()
  }

  subscribe(type: keyof Events<TMap>, listener: () => void): () => void {
    return this._emitter.on(type, listener)
  }

  unsubscribe(type: keyof Events<TMap>, listener: () => void) {
    this._emitter.off(type, listener)
  }
}
