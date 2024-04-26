import './toast.scss'

import React from 'react'

import { get } from '~/abstract/toast/toast/actions'
import { ToastEventNames } from '~/abstract/toast/toast/event-names'
import { Id } from '~/utils/core'
import { useForceUpdate, useOnMount } from '~/utils/hooks'

import { backgroundColors } from '../constants/background-colors'
import LandscapeAnimation from './landscape-animation'
import PortraitAnimation from './portrait-animation'

export default function Toast(props: { id: Id; isPortrait: boolean }): JSX.Element | null {
  const toast = get(props.id)
  const backgroundColor: string = backgroundColors[toast.type]
  const ToastAnimation = props.isPortrait ? PortraitAnimation : LandscapeAnimation
  const update = useForceUpdate()

  useOnMount(subscribeOnChanges)

  if (/<script>/.test(toast.data as string)) {
    console.error('Toast message contains tag "script"')
    console.error(toast.data)
    return null
  }

  const divChildren =
    typeof toast.data === 'string' ? { dangerouslySetInnerHTML: { __html: toast.data } } : { children: toast.data }

  return (
    <ToastAnimation toast={toast}>
      {/*eslint-disable-next-line jsx-a11y/mouse-events-have-key-events, jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions*/}
      <div
        data-x='Toast'
        style={{ backgroundColor, transition: 'background .5s' }}
        onMouseOver={() => toast.emitter.emit(ToastEventNames.stopShowingTransition)}
        onMouseLeave={() => toast.emitter.emit(ToastEventNames.continueShowingTransition)}
        onClick={() => toast.emitter.emit(ToastEventNames.setExiting)}
        {...(divChildren as any)}
      />
    </ToastAnimation>
  )

  // Private

  function subscribeOnChanges() {
    toast.emitter.on(ToastEventNames.update, update)
    toast.emitter.on(ToastEventNames.setEntering, update)
    toast.emitter.on(ToastEventNames.setShowing, update)
    toast.emitter.on(ToastEventNames.setExiting, update)
  }
}
