import { Location } from 'react-router-dom'

import { Route } from '~/lib/route'
import { onThemesAdd } from '~/lib/theme/on-themes-add'
import { setDocumentTitle } from '~/utils/core'
import { Emitter } from '~/utils/emitter'
import { Themes, ThemesFn } from '~/utils/theme'

import { DARK, LIGHT } from './theme'
import { themes } from './themes/themes'

export type Events = {
  /**
   * Добавить тему или переменные к существующим
   */
  addThemes: Themes | ThemesFn

  /**
   * Порядок ссылок навигации
   */
  navItemOrderChanged: string[]

  /**
   * Добавить пути к уже имеющимся
   */
  addRoutes: Record<string, Route>

  /**
   * Установить title для document
   */
  setDocumentTitle: string[]

  /**
   * Подписка на событие смены location
   */
  locationChanged: Location

  /**
   * Подписка на событие смены route
   */
  routeChanged: Route
}

export const emitter = new Emitter<Events>()

emitter.on('setDocumentTitle', setDocumentTitle)
emitter.on('routeChanged', (route) => emitter.emit('setDocumentTitle', ['Colibri', route.getName()]))

// eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-explicit-any
emitter.on('addThemes', (e) => onThemesAdd(e, themes as any))
emitter.emit('addThemes', { dark: DARK, light: LIGHT })
