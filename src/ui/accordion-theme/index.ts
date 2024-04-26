import { emitter } from '~/shared/emitter'

import { sizes } from './colibri/sizes'

emitter.emit('addThemes', { dark: sizes, light: sizes })
