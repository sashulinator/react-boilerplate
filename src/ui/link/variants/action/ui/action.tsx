import { getCmdCtrlSymbol } from '~/lib/formaters'
import Mark from '~/ui/mark'
import { c } from '~/utils/core'
import { isMetaCtrlKey, preventDefault } from '~/utils/dom-event'

import Link, { Props as LinkProps } from '../../../ui/link'

export interface Props extends LinkProps {
  tooltipContent: React.ReactNode
  onActionClick?: ((e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void) | undefined
}

const displayName = 'ui-Link-w-Action'

/**
 * Action
 *
 * Ссылка которая позволяет запускать событие по клику или открывать в новой вкладке если зажата клавиша Cmd/Ctrl
 */
export default function Component(props: Props): JSX.Element {
  const { tooltipContent, onActionClick, ...linkProps } = props

  return (
    <Mark
      placement='tl'
      tooltipContent={
        <div style={{ width: 'max-content' }}>
          {tooltipContent}
          <br />
          <br />
          <span style={{ opacity: '0.7', fontSize: '0.7em', textTransform: 'uppercase' }}>hotkeys:</span>
          <br />
          {getCmdCtrlSymbol()} + click - openInNewTab
        </div>
      }
    >
      <Link
        {...linkProps}
        className={c(props.className, displayName)}
        style={{ wordBreak: 'break-all' }}
        onClick={(e): void => {
          isMetaCtrlKey(e) ? onActionClick?.(e) : preventDefault(e)
          props.onClick?.(e)
        }}
      />
    </Mark>
  )
}

Component.displayName = displayName
