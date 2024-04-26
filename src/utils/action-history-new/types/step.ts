import { Id } from '~/utils/core'

export interface Step<Map extends Record<string, unknown>> {
  type: keyof Map
  payload: Map[keyof Map]
  historical: boolean
}

export interface Action<Map extends Record<string, unknown>> {
  id: Id
  done: boolean
  /** Название действия */
  name: string
  username: string
  /** Шаги выполнения действия */
  redos: Step<Map>[]
  /** Шаги отката действия */
  undos: Step<Map>[]
}
