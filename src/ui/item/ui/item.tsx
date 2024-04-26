import './item.scss'

import Flex, { FlexProps } from '~/abstract/flex'
import { Dictionary, c } from '~/utils/core'
import { keyListener } from '~/utils/dom-event'
import { fns } from '~/utils/function'

import Hidable from '../widgets/hidable'

const displayName = 'ui-Item'

export interface Props extends FlexProps {
  children: React.ReactNode
  index: number
  disabled?: boolean | undefined
  buttons?: React.ReactNode | undefined
  variant?: 'regular' | 'semitransparent' | undefined
  rootProps?: (React.HTMLAttributes<HTMLDivElement> & Dictionary) | undefined
  onItemClick?: ((e: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>) => void) | undefined
}

/**
 * Item
 */
export default function Component(props: Props): JSX.Element {
  const { variant = 'regular ', index, buttons, disabled, onItemClick, rootProps, ...flexProps } = props

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      className={c(props.className, displayName, `--${variant}`, disabled && '--disabled')}
      {...rootProps}
      aria-disabled={disabled}
      // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
      tabIndex={Boolean(!disabled && props.onItemClick) ? 0 : undefined}
      style={{ ...rootProps?.style, animationDelay: `${index * 30}ms`, pointerEvents: disabled ? 'none' : 'all' }}
      onClick={(e): void => (!window.getSelection()?.isCollapsed ? undefined : onItemClick?.(e))}
      onKeyDown={fns(
        rootProps?.onKeyDown,
        keyListener({ key: 'Enter' }, (e) => onItemClick?.(e))
      )}
    >
      <Flex className='content' gap='l' alignItems='center' width='100%' {...flexProps} />
      {buttons && <Hidable className='buttons'>{props.buttons}</Hidable>}
    </div>
  )
}

Component.displayName = displayName
