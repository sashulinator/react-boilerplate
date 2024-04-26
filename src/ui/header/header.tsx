import './header.scss'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Flex from '~/abstract/flex'
import getRootElement from '~/lib/dom/get-root-element'
import { routes } from '~/shared/routes'
import Button from '~/ui/button'
import Link from '~/ui/link'
import { c, isDev } from '~/utils/core'
import { setCSSVar } from '~/utils/dom'

import Checkbox from '../checkbox/ui/checkbox'
import { Logout } from '../icon/variants/logout'
import { User } from '../icon/variants/user'
import I18nDropdown from '../language-dropdown/ui/dropdown'
import Logo from '../logo'
import ThemeDropdown from '../theme-dropdown/ui/dropdown'

const displayName = 'ui-Header'

export default function Header(): JSX.Element {
  const navigate = useNavigate()
  setCSSVar('header-height', 42, getRootElement())

  const [isProd, setProd] = useState(() => localStorage.getItem('env') === 'production')

  return (
    <header className={c(displayName)}>
      <Link height={null} buttonVariant='ghost' className='logo-link' to={routes.main.path}>
        <Flex alignItems='center' gap='m' padding='0.1rem 0.3rem' margin='0.1rem 0 0 0'>
          <Flex justifyContent='center' alignItems='center' style={{ height: '2rem', width: '2rem' }}>
            <Logo width='2rem' />
          </Flex>
          <span>Colibri</span>
        </Flex>
      </Link>
      <div style={{ display: 'flex' }}>
        {process.env.NODE_ENV === 'development' && (
          <Flex justifyContent='center' alignItems='center' gap='m'>
            {isDev() && (
              <>
                <I18nDropdown />
                <ThemeDropdown />
              </>
            )}
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
        )}
        <Button variant='ghost' onClick={(): void => navigate(routes.settings.path)} square={true}>
          <User />
        </Button>
        <Button variant='ghost' onClick={(): void => navigate(routes.login.path)} square={true}>
          <Logout />
        </Button>
      </div>
    </header>
  )
}

Header.displayName = displayName
