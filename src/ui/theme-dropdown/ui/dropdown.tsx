import { ChangeEvent } from 'react'

import { THEME } from '~/constants/local-storage'
import { DEFAULT } from '~/constants/theme'
import { getCurrentThemeName } from '~/lib/theme'
import { themes } from '~/shared/themes/themes'
import { setTheme } from '~/utils/theme'

export default function ThemeDropdown(): JSX.Element {
  const options = Object.keys(themes)

  return (
    // eslint-disable-next-line jsx-a11y/no-onchange
    <select onChange={onChange} name='themes' defaultValue={getCurrentThemeName()}>
      {options.map((option) => {
        return (
          <option key={option} value={option}>
            {option}
          </option>
        )
      })}
    </select>
  )

  function onChange(e: ChangeEvent<HTMLSelectElement>): void {
    setTheme(e.target.value as 'light', DEFAULT, themes, THEME)
  }
}

ThemeDropdown.dispayName = 'ThemeDropdown'
