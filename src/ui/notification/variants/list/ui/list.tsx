import './list.scss'

import { createElement } from 'react'

import { Controller } from '~/abstract/notification'
import { c, group } from '~/utils/core'
import { EmitterDictionary } from '~/utils/emitter'
import { useUpdate } from '~/utils/hooks'

export interface Props extends React.HTMLAttributes<HTMLElement> {
  className?: string | undefined
  list: EmitterDictionary<Controller>
  limit?: number
  //
  renderItem: (props: {
    notification: Controller
    getFrom: (notification: Controller) => Record<string, unknown>
    getTo: (notification: Controller) => Record<string, unknown>
  }) => React.ReactNode
}

const displayName = 'a-Notification-v-List'

/**
 * List
 */
export default function Component(props: Props): JSX.Element {
  const { className, list, renderItem, limit = Infinity, ...asideProps } = props

  useUpdate(subscribeToUpdates, [props.limit])

  const values = list.values()
  const groupedList = group(values, (notification) => notification.position)

  return (
    <div {...asideProps} className={c(className, displayName)}>
      {Object.entries(groupedList).map(([groupName, notifications]) => {
        const isBottom = groupName.indexOf('bottom') !== -1
        const isLeft = groupName.indexOf('left') !== -1
        const isTop = groupName.indexOf('top') !== -1
        const isCenter = groupName.indexOf('center') !== -1
        const reversedList = isBottom ? notifications.reverse() : notifications

        return (
          <div key={groupName} className={c('group', ...groupName.split('-').map((str) => `--${str}`))}>
            {reversedList.map((notification) => {
              return createElement(renderItem, {
                key: notification.id,
                notification,
                getFrom: (notification): Record<string, unknown> => {
                  if (isCenter) {
                    const x = 0
                    const y =
                      notification.status.value === 'enter' ? (isTop ? -window.screen.height : window.screen.height) : 0
                    return { x, y }
                  }

                  return {
                    x:
                      notification.status.value === 'enter' ? (isLeft ? -window.screen.width : window.screen.width) : 0,
                    y: 0,
                  }
                },
                getTo: (notification): Record<string, unknown> => {
                  return {
                    x: 0,
                    y:
                      notification.status.value === 'exit'
                        ? isBottom
                          ? window.screen.height
                          : -window.screen.height
                        : 0,
                  }
                },
              })
            })}
          </div>
        )
      })}
    </div>
  )

  function subscribeToUpdates(update: () => void, uns: ((() => void) | undefined)[]): void {
    // Удаляем самый старый если привышен лимит на количество
    uns.push(
      props.list.on('add', (e) => {
        const values = props.list.values()
        const groupedList = group(values, (notification) => notification.position)
        const groupNotifications = groupedList[e.item.position]

        if (groupNotifications.length > limit) {
          const lastNotification = groupNotifications.find((notification) => notification.status.value !== 'exit')
          lastNotification?.status.set('exit')
        }
        update()
      })
    )

    // Удаляем если статус exited
    uns.push(
      props.list.on('status' as 'add', (e) => {
        if (e.item.status.value === 'exited') props.list.remove(e.item.id)
      })
    )

    uns.push(props.list.on('remove', update))
  }
}

Component.displayName = displayName
