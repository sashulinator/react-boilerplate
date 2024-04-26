import { Location, matchPath } from 'react-router-dom'

import { routes } from '~/shared/routes'

import { Route } from './types/route'

export function getCurrent(location: Location): Route {
  const route = Object.values(routes).find((route) => matchPath(route.path, location.pathname))
  return route === undefined ? routes.notFound : route
}
