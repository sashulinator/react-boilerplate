import clr from 'color'

import { RequiredVars } from '~/utils/theme'

const primary = clr('#027ffe')
const color = clr('#b2bac2')
const bg = clr('#202124')
const bgSecondary = clr('#303134')

export const DARK = {
  primary,
  color,
  bg,
  bgSecondary,

  caretColor: clr('yellow'),
  selectionColor: 'black',
  selectionBg: clr('yellow'),

  outlineColor: clr('yellow').alpha(0.8),
  borderColor: clr('#265d97'),
  successColor: clr('#3f9c35'),
  errorColor: clr('#d2302f'),
  errorBg: clr('#663838'),
  boxShadow: '0px 0px 8px 0px rgba(255, 255, 255, 0.1)',
  focus: clr('yellow').alpha(0.8),
} satisfies RequiredVars
