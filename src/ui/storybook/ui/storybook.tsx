import './storybook.scss'

import { createElement, useState } from 'react'
import * as Storybook from 'utils/storybook'

import Button from '~/ui/button'
import { SpacingWidth } from '~/ui/icon'
import Scrollbar from '~/ui/scrollbar'
import { c } from '~/utils/core'
import { setPath } from '~/utils/dictionary'
import { useBoolean } from '~/utils/hooks'

import { Controls } from '..'

const displayName = 'ui-Storybook'
const lsIsHideControlsName = `${displayName}-isHideControls`

export type Props = Storybook.Config<Record<string, unknown>>

export default function Page(props: Props): JSX.Element {
  const [state, setState] = useState(buildState())
  const [isHideControls, , , toggleControlsVisibility] = useBoolean(
    () => localStorage.getItem(lsIsHideControlsName) === 'true'
  )

  let elements = ['description', 'showcase']
  if (!isHideControls) {
    elements = [...elements, 'controls']
  }

  return (
    <div className={c(displayName, `--${elements.join('-')}`)}>
      <div className='toolbar'>
        <Button
          variant='ghost'
          onClick={(): void => {
            toggleControlsVisibility()
            localStorage.setItem(lsIsHideControlsName, String(localStorage.getItem(lsIsHideControlsName) !== 'true'))
          }}
          round={true}
          height={'l'}
        >
          <SpacingWidth style={{ transform: 'rotate(90deg)' }} />
        </Button>
      </div>
      <div className='description'>
        <Scrollbar style={{ padding: 'var(--xl)' }}>
          <div style={{ padding: 'var(--xl)' }}>{props.getDescription?.()}</div>
        </Scrollbar>
      </div>
      <div className='showcase'>
        <Scrollbar>
          <>{createElement(props.element, { state, setState })}</>
        </Scrollbar>
      </div>
      {!isHideControls && (
        <div className='controls'>
          <Scrollbar>
            <div style={{ padding: 'var(--xl)' }}>
              <Controls controls={props.controls} state={state} setState={setState} />
            </div>
          </Scrollbar>
        </div>
      )}
    </div>
  )

  function buildState(): Record<string, unknown> {
    let state = {}
    props.controls.forEach((control) => {
      state = setPath(control?.path || [control.name], control.defaultValue, state)
    })
    return state
  }
}
