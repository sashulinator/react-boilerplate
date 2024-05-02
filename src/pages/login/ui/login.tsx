import './login.scss'

import { useNavigate } from 'react-router'

import Flex from '~/abstract/flex'
import { CURRENT_USER, USER_LIST } from '~/constants/local-storage'
import { useTranslation } from '~/shared/localization'
import { notify } from '~/shared/notify'
import { routes } from '~/shared/routes'
import I18nDropdown from '~/ui/language-dropdown'
import LoginForm, { FormSubmitData, User } from '~/ui/login-form'
import Logo from '~/ui/logo'
import ThemeDropdown from '~/ui/theme-dropdown'

import { translationSchema } from './translation-schema'

export const displayName = 'page-Login'

export default function LoginPage(): JSX.Element {
  const navigate = useNavigate()

  const { t } = useTranslation(translationSchema)

  return (
    <main className='page-Login' style={{ height: '99vh' }}>
      <div className='form'>
        <Flex className='controls' width='100%' crossAxis='center' gap='xl'>
          <Logo width='4rem' />
          <Flex gap='s'>
            <I18nDropdown />
            <ThemeDropdown />
          </Flex>
        </Flex>
        <LoginForm
          localStorageName={USER_LIST}
          onSubmit={onSubmit}
          translations={{
            login: t('login'),
            add: t('add'),
            change: t('change'),
            username: t('username'),
            password: t('password'),
          }}
        />
      </div>
    </main>
  )

  function onSubmit(data: FormSubmitData, onSuccess: (user: User) => void): void {
    if (!data.password || !data.username) {
      return
    }
    onSuccess({ name: data.username })
    navigate(routes.main.path)
    localStorage.setItem(CURRENT_USER, data.username)

    notify({ data: t('success.loggedIn', data), type: 'success' })
  }
}

LoginPage.displayName = displayName
