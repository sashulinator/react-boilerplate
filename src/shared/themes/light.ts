import clr from 'color'

import { RequiredVars } from '~/utils/theme'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function getLightColors() {
  // 🟢 See index.html
  const defaultPrimary = localStorage.getItem('--default-primary')
  const defaultColor = localStorage.getItem('--default-color')
  const defaultBg = localStorage.getItem('--default-bg')

  if (defaultBg === null) {
    throw new Error('LocalStorage must contain "--default-bg" record')
  }
  if (defaultPrimary === null) {
    throw new Error('LocalStorage must contain "--default-primary" record')
  }
  if (defaultColor === null) {
    throw new Error('LocalStorage must contain "--default-color" record')
  }

  const primary = clr(defaultPrimary)
  const color = clr(defaultColor)
  const bg = clr(defaultBg)
  const bgSecondary = clr('white')

  const colors = {
    primary,
    color,
    bg,
    bgSecondary,
    caretColor: clr('black'),
    selectionColor: clr('white'),
    selectionBg: primary,
    outlineColor: primary.alpha(0.5),
    borderColor: clr('#cdd2d6'),
    errorColor: clr('#d2302f'),
    errorBg: clr('#ffa9a9'),
    boxShadow: '0px 0px 8px 0px rgba(0, 0, 0, 0.1)',
    successColor: clr('#3f9c35'),
    focus: primary,
  } satisfies RequiredVars

  return colors
}

export default getLightColors()
