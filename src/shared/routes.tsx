import { lazy } from 'react'

import { Route } from '~/lib/route'
import Login from '~/pages/login'
import Main from '~/pages/main'
import NotFound from '~/pages/not-found'
import Settings from '~/pages/settings'
import Header from '~/ui/header'
import { Flag } from '~/ui/icon'
import { Mini as Nav } from '~/ui/nav'
import { isDev } from '~/utils/core'

const Storybook = lazy(() => import('~/pages/storybook'))
const StorybookNav = lazy(() => import('~/ui/storybook/widgets/nav'))

export const routes = {
  /**
   * Misc
   */

  main: {
    path: '/',
    getURL: (): string => routes.main.path,
    getName: (): string => 'Главная',
    renderMain: Main,
    renderHeader: Header,
    renderNav: Nav,
    navigatable: false,
  },

  settings: {
    path: '/settings',
    getURL: (): string => routes.settings.path,
    getName: (): string => 'Настройки',
    renderMain: Settings,
    renderHeader: Header,
    renderNav: Nav,
    navigatable: false,
  },

  login: {
    path: '/login',
    getURL: (): string => routes.login.path,
    getName: (): string => 'Вход',
    renderMain: Login,
    navigatable: false,
  },

  storybook: {
    path: '/storybook/*',
    getURL: (): string => '/storybook',
    getName: (): string => 'Storybook',
    renderMain: Storybook as unknown as () => JSX.Element,
    renderNav: StorybookNav as unknown as () => JSX.Element,
    renderIcon: Flag as unknown as () => JSX.Element,
    navigatable: isDev(),
    layoutModificator: '--storybook',
  },

  notFound: {
    renderHeader: Header,
    renderNav: Nav,
    path: '/*',
    renderMain: NotFound,
    getName: (): string => 'Не найдено',
    getURL: (): string => '',
    navigatable: false,
  },
} satisfies Record<string, Route>
