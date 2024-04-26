/**
 * set theme
 */
import { emitter } from '../../shared/emitter'

/**
 * set constants
 */
import dark from './colors/colibri/dark'
import light from './colors/colibri/light'
import rounded from './sizes/colibri/rounded'

emitter.emit('addThemes', {
  dark: { ...dark, ...rounded },
  light: { ...light, ...rounded },
})
