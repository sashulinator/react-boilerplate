import { Fragment, useState } from 'react'
import * as Storybook from 'utils/storybook'

import Flex from '~/abstract/flex'
import getRootElement from '~/lib/dom/get-root-element'
import { routes } from '~/pages/storybook/routes'
import { ChevronAccordion } from '~/ui/accordion'
import Checkbox from '~/ui/checkbox'
import Scrollbar from '~/ui/scrollbar'
import ThemeDropdown from '~/ui/theme-dropdown'
import { Any } from '~/utils/core'
import { setCSSVar } from '~/utils/dom'

import { configToPath } from '../../../lib'
import ConfigLink from '../widgets/config-link/ui/config-link'

export default function Component(): JSX.Element {
  setCSSVar('nav-width', 300, getRootElement())

  const [isProd, setProd] = useState(() => localStorage.getItem('env') === 'production')

  return (
    <nav
      style={{
        borderRight: '1px solid var(--bgSecondary)',
        height: '100vh',
      }}
    >
      <Scrollbar autoHide autoHideTimeout={1000} autoHideDuration={500}>
        <Flex gap='xxxl' dir='column' padding='var(--l) var(--xxxl) 30vh var(--xxxl) '>
          <ul style={{ width: '100%' }}>
            <Flex gap='m' dir='column'>
              <Flex alignItems='center' gap='xxl'>
                <ThemeDropdown />
                <Checkbox
                  checked={isProd}
                  placeholder='production'
                  onChange={(e): void => {
                    setProd(e.target.checked)
                    if (e.target.checked) {
                      localStorage.setItem('env', 'production')
                    } else {
                      localStorage.setItem('env', 'development')
                    }
                  }}
                />
              </Flex>
              <ul>
                {routes.flatMap(([name, ...configs], i) => {
                  if (name === '-') {
                    return <hr key={`${name}${i}`} />
                  }
                  return (
                    <Fragment key={name}>
                      <ChevronAccordion header={name}>
                        <Flex dir='column' gap='l' padding='var(--m) 0 var(--m) var(--m) '>
                          {configs.map((c: unknown) => {
                            const config = c as Storybook.Config<Any>
                            const path = configToPath(config)
                            return (
                              <li key={path}>
                                <ConfigLink config={config} />
                              </li>
                            )
                          })}
                        </Flex>
                      </ChevronAccordion>
                    </Fragment>
                  )
                })}
              </ul>
            </Flex>
          </ul>
        </Flex>
      </Scrollbar>
    </nav>
  )
}
