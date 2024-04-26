import { themes } from '~/shared/themes/themes'
import { ToStringable } from '~/utils/core'
import { setCSSVars } from '~/utils/dom'
import { RequiredVars, Themes, ThemesFn } from '~/utils/theme'

import { getCurrentThemeName } from './get-current-theme-name'

export function onThemesAdd(newThemes: Themes | ThemesFn, requiredVars: { [name: string]: RequiredVars }): void {
  const themeNames = Object.keys(newThemes)

  const themeSet = _themeAdapter(newThemes, getCurrentThemeName(), requiredVars)

  setCSSVars(themeSet)

  themeNames.forEach((themeName) => {
    const themeSet = _themeAdapter(newThemes, themeName, requiredVars)
    themes[themeName] = { ...themes[themeName], ...themeSet }
  })
}

function _themeAdapter(
  newThemes: Themes | ThemesFn,
  name: string | number,
  requiredVars: { [name: string]: RequiredVars }
): { [varName: string]: ToStringable } {
  const theme = newThemes[name]
  let vars: { [varName: string]: ToStringable } = {}

  if (typeof theme === 'function') {
    vars = theme(requiredVars[name])
  } else {
    vars = theme
  }

  return vars
}
