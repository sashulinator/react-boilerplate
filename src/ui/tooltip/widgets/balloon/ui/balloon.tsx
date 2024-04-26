import { ForwardedRef, forwardRef } from 'react'

import ABalloon from '~/abstract/balloon'
import FitContent from '~/abstract/fit-content/ui/fit-content'
import { Point } from '~/abstract/popover'
import { AppearFrom } from '~/ui/animation'
import { c } from '~/utils/core'
import { useMeasure } from '~/utils/hooks'
import { setRefs } from '~/utils/react'

import { _getAnimationPosition } from '../lib/_get-animation-position'

const displayName = 'ui-Tooltip-w-Balloon'

export interface Props {
  className: string
  contents: React.ReactNode
  points: Point[]
}

function Component(props: Props, ref: ForwardedRef<HTMLElement>): JSX.Element {
  const [measureRef, size] = useMeasure()

  const placement = props.points[1]

  return (
    <FitContent ref={setRefs(ref)} style={{ ...size, pointerEvents: 'none' }}>
      <AppearFrom duration={100} {..._getAnimationPosition(placement)} style={{ position: 'fixed', zIndex: 1 }}>
        <ABalloon
          ref={setRefs(measureRef)}
          style={{ visibility: size.width ? 'visible' : 'hidden' }}
          placement={placement}
          className={c(props.className, displayName)}
          contentProps={{ className: 'content', style: { position: 'absolute' } }}
          renderArrow={_Arrow}
        >
          {props.contents}
        </ABalloon>
      </AppearFrom>
    </FitContent>
  )
}

const ForwardRef = forwardRef(Component)
ForwardRef.displayName = displayName
export default ForwardRef

/**
 * Private
 */

const _Arrow = forwardRef(function Element(props, ref): JSX.Element {
  return <div className='arrow' ref={setRefs(ref)} style={{ position: 'absolute' }} />
})
