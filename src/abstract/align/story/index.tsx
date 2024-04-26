import { useState } from 'react'
import { setRefs } from 'utils/react'
import * as Storybook from 'utils/storybook'

import Align, { AlignProps } from '../'

interface State {
  sourcePosition: 'fixed' | 'absolute'
  points: AlignProps['points']
  everflow: AlignProps['overflow']
  portalSourceIntoContainer: boolean
  containerRelative: boolean
  useCSSTransform: boolean
}

export default {
  getName: (): string => Align.displayName,

  getDescription: function Description(): JSX.Element {
    return (
      <>
        <h1>{Align.displayName}</h1>
        Добавьте описание
      </>
    )
  },

  element: function Element(props: Storybook.Props<State>): JSX.Element {
    const {
      state: { portalSourceIntoContainer, containerRelative, ...compProps },
    } = props
    const [ref, setRef] = useState<null | HTMLElement>()
    const [containerRef, setContainerRef] = useState<null | HTMLElement>()
    const [renderCount, setRenderCount] = useState(0)

    return (
      <div style={{ overflow: 'hidden', width: '100%', height: '100%' }} ref={setContainerRef}>
        !!! Использование useCSSTransform предотвращает повтор анимации при ререндеринге
        <br />
        renders {renderCount}
        <div
          style={{
            padding: '200px 0 0 500px',
            border: containerRelative ? '1px solid red' : '1px solid blue',
            position: containerRelative ? 'relative' : undefined,
          }}
        >
          <button ref={setRefs(setRef)} onClick={(): void => setRenderCount((s) => ++s)}>
            Target (click to rerender)
          </button>
          {ref && (
            <Align
              targetElement={ref}
              deps={[renderCount]}
              useCssTransform={true}
              containerElement={portalSourceIntoContainer ? containerRef : undefined}
              {...compProps}
            >
              <div
                style={{
                  width: '400px',
                  height: '100px',
                  background: 'red',
                }}
              >
                <div style={{ animation: '300ms forwards fromRight33px, 300ms forwards appear' }}>Source</div>
              </div>
            </Align>
          )}
        </div>
      </div>
    )
  },

  controls: [
    {
      name: 'sourcePoint',
      path: ['points', 0],
      input: 'select',
      options: ['bc', 'bl', 'br', 'tc', 'tl', 'tr', 'cc', 'cl', 'cr'],
      defaultValue: 'cr',
      style: { width: '200px' },
    },
    {
      name: 'targetPoint',
      path: ['points', 1],
      input: 'select',
      options: ['bc', 'bl', 'br', 'tc', 'tl', 'tr', 'cc', 'cl', 'cr'],
      defaultValue: 'cl',
      style: { width: '200px' },
    },
    { name: 'portalSourceIntoContainer', input: 'checkbox', defaultValue: false },
    { name: 'containerRelative', input: 'checkbox', defaultValue: false },
    { name: 'adjustX', path: ['overflow', 'adjustX'], input: 'checkbox', defaultValue: false },
    { name: 'adjustX', path: ['overflow', 'adjustX'], input: 'checkbox', defaultValue: false },
    { name: 'useCssTransform', input: 'checkbox', defaultValue: false },
    { name: 'alwaysByViewport', path: ['overflow', 'alwaysByViewport'], input: 'checkbox', defaultValue: false },
  ],
} satisfies Storybook.Config<State>
