import React, { useEffect } from 'react'
import { BrowserRouter, Route, Routes, matchPath, useLocation, useNavigate } from 'react-router-dom'

import { getCurrent as getCurrentRoute } from '~/lib/route'
import { emitter } from '~/shared/emitter'
import { routes } from '~/shared/routes'
import { getUsername } from '~/shared/username'

ProtectedRoutes.displayName = 'app-Routes'

export interface Props {
  className?: string
  renderLayout: (props: { children: React.ReactNode }) => JSX.Element | null
}

// Пока еще не протектед но скоро будут
export default function ProtectedRoutes(props: Props): JSX.Element {
  const Layout = props.renderLayout

  return (
    <BrowserRouter>
      <ListenLocationChange />
      <Layout>
        <Protect />
        <Routes>
          {Object.entries(routes).map(([key, route]) => (
            <Route key={key} {...route} element={React.createElement(route.renderMain)} />
          ))}
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

function Protect(): null {
  const navigate = useNavigate()

  useEffect(() => {
    if (!getUsername() && !matchPath(location.pathname, routes.login.getURL())) navigate(routes.login.getURL())
  })

  return null
}

/**
 * Private
 */
const ListenLocationChange = (): null => {
  const location = useLocation()
  useEffect(() => emitter.emit('locationChanged', location), [location])
  useEffect(() => emitter.emit('routeChanged', getCurrentRoute(location)), [location])
  return null
}
