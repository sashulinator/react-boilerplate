import { ToStringable } from '~/utils/core'

import { RequiredVars } from './required-vars'

/**
 * @deprecated
 */
export type Themes = { [themeName: string]: { [varName: string]: ToStringable } }

export type ThemesFn = { [themeName: string]: (theme: RequiredVars) => { [varName: string]: ToStringable } }
