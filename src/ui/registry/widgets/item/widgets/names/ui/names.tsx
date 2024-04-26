import { memo } from 'react'

import Flex from '~/abstract/flex'
import Link from '~/ui/link'
import Mark from '~/ui/mark'
import { c } from '~/utils/core'
import { preventDefault } from '~/utils/dom-event'
import { fns } from '~/utils/function'

export interface Props {
  className?: string
  name?: string | undefined
  keyName?: string | undefined
  width: string
  url?: string | undefined
}

const displayName = 'ui-Registry-w-Item-w-Names'

/**
 * Actors
 */
function Component(props: Props): JSX.Element {
  return (
    <Flex
      className={c(displayName, props.className)}
      style={{ width: props.width, overflow: 'hidden', wordBreak: 'break-all' }}
      dir='column'
    >
      <Mark tooltipContent='Название'>
        {props.url ? (
          <Link style={{ wordBreak: 'break-all' }} to={props.url} onClick={fns(preventDefault)}>
            {props?.name}
          </Link>
        ) : (
          <span style={{ color: 'var(--primary)' }}>{props?.name}</span>
        )}
      </Mark>
      <Mark tooltipContent='Системное название'>
        <span style={{ fontSize: '0.8em' }}>{props?.keyName}</span>
      </Mark>
    </Flex>
  )
}

Component.displayName = displayName
export const Names = memo(Component)
