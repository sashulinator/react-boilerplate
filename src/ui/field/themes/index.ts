import './colors.scss'

import { emitter } from '~/shared/emitter'

import dark from './dark'
import light from './light'
import sizes from './sizes'

emitter.emit('addThemes', {
  dark: (e) => ({ ...dark(e), ...sizes() }),
  light: (e) => ({ ...light(e), ...sizes() }),
})
