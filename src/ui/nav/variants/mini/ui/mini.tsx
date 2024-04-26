import './mini.scss'

import React, { useEffect, useMemo, useState } from 'react'
import { matchPath, useLocation, useNavigate } from 'react-router-dom'

import Flex from '~/abstract/flex'
import getRootElement from '~/lib/dom/get-root-element'
import { Route } from '~/lib/route'
import { emitter } from '~/shared/emitter'
import { routes } from '~/shared/routes'
import { AppearFrom } from '~/ui/animation'
import Button from '~/ui/button'
import Tooltip from '~/ui/tooltip'
import { assertDefined, c, isDev } from '~/utils/core'
import { setCSSVar } from '~/utils/dom'
import { isMetaCtrlKey } from '~/utils/dom-event'
import { getJSON } from '~/utils/local-storage'

Mini.displayName = 'ui-Nav-v-Mini'

export default function Mini(): JSX.Element {
  setCSSVar('nav-width', 200, getRootElement())
  const [obj, update] = useState({})

  useEffect(() => {
    emitter.on('navItemOrderChanged', update)
  }, [])

  const order =
    getJSON<string[]>('mainListOrder', (data) => {
      if (!Array.isArray(data)) throw Error('Not Array')
      if (data?.some((item) => typeof item !== 'string' || !routes[item])) throw Error('No such route')
    }) || []

  const navRoutes = useMemo(() => {
    return order
      ?.map((name) => {
        return routes[name] as Route
      })
      .filter(Boolean)
  }, [obj])

  useEffect(() => {
    if (isDev()) {
      navRoutes.push(routes.storybook as Route)
      update({})
    }
  }, [])

  return (
    <Flex as='nav' className={c(Mini.displayName)} mainAxis='center' padding='var(--xxxl) 0'>
      <Flex as='ul' dir='column' gap='xxl' crossAxis='center' width='34px'>
        {navRoutes?.map((route, i) => <Item key={route.path} route={route} index={i} />)}
      </Flex>
    </Flex>
  )
}

interface ItemProps {
  route: Route
  index: number
}

function Item(props: ItemProps): JSX.Element {
  const location = useLocation()
  const navigate = useNavigate()

  const isCurrent = matchPath({ end: false, path: props.route.getURL() }, location.pathname)
  assertDefined(props.route.renderIcon, props.route.getName())

  return (
    <Tooltip placement='cr' contents={props.route.getName()} delay={100}>
      <li style={{ width: '100%' }}>
        <AppearFrom from={{ x: -20, opacity: 1 }} delay={props.index * 70}>
          <Button
            variant={isCurrent ? 'primary' : 'ghost'}
            square={true}
            onClick={(e): unknown =>
              isMetaCtrlKey(e) ? window.open(props.route.getURL(), '_blank') : navigate(props.route.getURL())
            }
          >
            {React.createElement(props.route.renderIcon)}
          </Button>
        </AppearFrom>
      </li>
    </Tooltip>
  )
}
