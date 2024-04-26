import { Edit } from '~/ui/icon'
import Link, { LinkProps } from '~/ui/link'
import { c } from '~/utils/core'
import { isMetaCtrlKey, preventDefault, stopPropagation } from '~/utils/dom-event'
import { fns } from '~/utils/function'

export interface Props extends LinkProps {
  className?: string | undefined
  to: string
  onClick: (e: React.MouseEvent) => void
}

const displayName = 'ui-Item-w-Button-w-Edit'

/**
 * Edit
 */
export default function Component(props: Props): JSX.Element {
  const { onClick, ...linkProps } = props

  return (
    <Link
      {...linkProps}
      className={c(displayName, props.className)}
      onClick={(e): unknown => (isMetaCtrlKey(e) ? stopPropagation(e) : fns(preventDefault, onClick))}
      buttonVariant='ghost'
      round={true}
    >
      <Edit />
    </Link>
  )
}

Component.displayName = displayName
