import Balloon from 'abstract/balloon'
import Tooltip, { Point } from 'abstract/tooltip'
import { ForwardedRef, forwardRef, useEffect, useState } from 'react'
import { setRefs } from 'utils/react'
import * as Storybook from 'utils/storybook'

interface State {
  delay: number
  placement: Point
}

export default {
  getName: (): string => Tooltip.displayName,

  getDescription: function Description(): JSX.Element {
    return (
      <>
        <h1>{Tooltip.displayName}</h1>
        Добавьте описание
      </>
    )
  },

  element: function Element(props: Storybook.Props<State>): JSX.Element {
    const [count, setCount] = useState(0)

    useEffect(() => {
      setTimeout(() => {
        setCount(count + 1)
      }, 1000)
    }, [])

    const { state } = props

    return (
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <Tooltip balloonProps={{ placement: props.state.placement, count }} renderBalloon={SBalloon} {...state}>
          <button onClick={(): void => setCount(count + 1)}>Count ({count})</button>
        </Tooltip>
      </div>
    )
  },

  controls: [
    {
      name: 'placement',
      input: 'select',
      options: ['bc', 'bl', 'br', 'tc', 'tl', 'tr', 'cc', 'cl', 'cr'],
      defaultValue: 'tl',
      style: { width: '200px' },
    },
    {
      name: 'delay',
      input: 'input',
      defaultValue: 300,
      width: '200px',
      type: 'number',
    },
  ],
} satisfies Storybook.Config<State>

// Private

interface BalloonProps {
  placement: Point
  count: number
}

const SBalloon = forwardRef(function Element(props: BalloonProps, ref: ForwardedRef<HTMLElement>): JSX.Element {
  return (
    <Balloon
      className={'story-Tooltip'}
      placement={props.placement}
      ref={setRefs(ref)}
      contentProps={{
        style: {
          background: 'red',
          position: 'absolute',
          zIndex: 2,
        },
      }}
      renderArrow={forwardRef(function Element(props, ref): JSX.Element {
        return (
          <div
            ref={setRefs(ref)}
            style={{
              position: 'absolute',
              background: 'blue',
              width: '10px',
              height: '10px',
              transform: 'rotate(45deg)',
              zIndex: 1,
            }}
          />
        )
      })}
      // contentProps={{ style: { background: 'red' } }}
    >
      <div style={{ width: '200px', height: '100px' }}>Rerender ({props.count})</div>
    </Balloon>
  )
})
