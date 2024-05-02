/* eslint-disable eslint-comments/disable-enable-pair, react-hooks/rules-of-hooks */
import './reset.css'

import './app.css'
import './measures.css'
import './utils.css'

import { Suspense } from 'react'
import { createPortal } from 'react-dom'
import { QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { RecoilRoot } from 'recoil'

import { init as initLocalization } from '~/shared/localization'
import { list as notificationList } from '~/shared/notify'
import { queryClient } from '~/shared/react-query'
import { RootLayout } from '~/ui/layout'
import { Container as ModalContainer } from '~/ui/modal'
import { NotificationList, StatusNotification } from '~/ui/notification'
import { Container as ToastContainer } from '~/ui/toast'
import { Container as TooltipContainer } from '~/ui/tooltip'

import ProtectedRoutes from './protected-routes'

void initLocalization()

export default function App(): JSX.Element {
  // prettier-ignore
  return (
    <Suspense>
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <ProtectedRoutes renderLayout={RootLayout}/>
          {createPortal([
            <ModalContainer key='0'/>,
            <ReactQueryDevtools key='1' position='bottom-right' />,
            <ToastContainer key='2' />,
            <TooltipContainer key='3'/>,
            <NotificationList key='4' renderItem={StatusNotification} list={notificationList} limit={3} style={{ zIndex: 1000 }}/>,
          ], document.body)}
        </RecoilRoot>

      </QueryClientProvider>
    </Suspense>
  )
}
