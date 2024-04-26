import clr from 'color'

import { RequiredVars } from '~/utils/theme'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function getDarkColors() {
  const primary = clr('#027ffe')
  const color = clr('#b2bac2')
  const bg = clr('#202124')
  const bgSecondary = clr('#303134')
  const colors = {
    primary,
    color,
    bg,
    bgSecondary,
    caretColor: clr('yellow'),
    selectionColor: color,
    selectionBg: clr('yellow'),
    outlineColor: clr('yellow').alpha(0.8),
    borderColor: clr('#265d97'),
    errorColor: clr('#d2302f'),
    errorBg: clr('#663838'),
    successColor: clr('#3f9c35'),
    boxShadow: '0px 0px 8px 0px rgba(255, 255, 255, 0.1)',
    focus: clr('yellow').alpha(0.8),
  } satisfies RequiredVars

  return colors
}

export default getDarkColors()
