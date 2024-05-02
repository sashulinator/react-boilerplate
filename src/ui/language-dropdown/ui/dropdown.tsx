import { ChangeEvent } from 'react'

import { Codes, setCurrent } from '~/shared/localization'
import { getCurrent } from '~/shared/localization/lib/get-current'

export default function I18nDropdown(): JSX.Element {
  const options = Object.values(Codes)

  return (
    // eslint-disable-next-line jsx-a11y/no-onchange
    <select onChange={onChange} name='themes' defaultValue={getCurrent()}>
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
    void setCurrent(e.target.value as Codes)
  }
}

I18nDropdown.dispayName = 'I18nDropdown'
