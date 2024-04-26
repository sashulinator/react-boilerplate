import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import * as Storybook from 'utils/storybook'

import { emitter } from '~/shared/emitter'
import StorybookUI, { configToPath } from '~/ui/storybook'
import { Any } from '~/utils/core'

import { routes } from './routes'

export default function StorybookPage(): JSX.Element {
  const location = useLocation()

  useEffect(() => emitter.emit('setDocumentTitle', ['Storybook']), [location])

  return (
    <main>
      <Routes>
        {routes.flatMap(([, ...configs]) => {
          return configs.map((config: Storybook.Config<Any>) => {
            const path = configToPath(config)
            return <Route key={path} path={path} element={<StorybookUI key={path} {...config} />} />
          })
        })}
      </Routes>
    </main>
  )
}
