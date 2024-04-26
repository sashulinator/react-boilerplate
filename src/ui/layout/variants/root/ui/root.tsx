import './root.scss'

import { matchPath } from 'react-router'
import { useLocation } from 'react-router-dom'

import { Route } from '~/lib/route'
import { emitter } from '~/shared/emitter'
import { routes } from '~/shared/routes'
import Scrollbar from '~/ui/scrollbar'
import { c } from '~/utils/core'
import { useUpdate } from '~/utils/hooks'

import { _createLayoutClass } from '../lib/_create-classnames'

const displayName = 'ui-Layout-v-Root'

export interface Props {
  children?: React.ReactNode
}

export default function Component(props: Props): null | JSX.Element {
  useUpdate(subscribeOnUpdates)

  const location = useLocation()
  const routeList = Object.values(routes)
  const currentRoute: Route | undefined = routeList.find((route) => matchPath(route.path, location.pathname))

  const modificator = currentRoute?.layoutModificator || '--app'

  return (
    <Scrollbar className={`${displayName}-scrollbarWrapper`}>
      <div className={c(displayName, modificator, _createLayoutClass(currentRoute))}>
        {currentRoute?.renderHeader && <currentRoute.renderHeader />}
        {currentRoute?.renderNav && <currentRoute.renderNav />}
        {props.children}
      </div>
    </Scrollbar>
  )

  function subscribeOnUpdates(update: () => void): void {
    emitter.on('addRoutes', (newRoutes) => {
      Object.assign(routes, newRoutes)
      update()
    })
  }
}

Component.displayName = displayName
