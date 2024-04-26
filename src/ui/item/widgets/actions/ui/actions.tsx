import Flex, { FlexProps } from '~/abstract/flex'
import Button from '~/ui/button'
import { Share } from '~/ui/icon'
import { TrashButton } from '~/ui/item'
import Tooltip from '~/ui/tooltip/ui/tooltip'
import { c, isDev } from '~/utils/core'
import { keyListener, stopPropagation } from '~/utils/dom-event'
import { fns } from '~/utils/function'

export interface Props extends FlexProps {
  className?: string | undefined
  onShareClick?: (event: React.MouseEvent) => void
  onTrashClick?: (event: React.MouseEvent) => void
}

const displayName = 'ui-Item-v-Actions'

/**
 * Actions
 */
export default function Component(props: Props): JSX.Element {
  const { onTrashClick, onShareClick, ...flexProps } = props

  return (
    <Flex {...flexProps} className={c(props.className, displayName, 'hidable')} gap='m'>
      {onShareClick && (
        <Tooltip contents='Поделиться'>
          <Button
            round={true}
            height='s'
            variant='tooltip'
            onClick={fns(onShareClick, stopPropagation)}
            onKeyDown={keyListener<React.KeyboardEvent>({ key: 'Enter' }, stopPropagation)}
          >
            <Share />
          </Button>
        </Tooltip>
      )}
      {onTrashClick && isDev() && (
        <Tooltip contents='Удалить'>
          <TrashButton
            variant='tooltip'
            height='s'
            onClick={fns(onTrashClick, stopPropagation)}
            onKeyDown={keyListener<React.KeyboardEvent>({ key: 'Enter' }, stopPropagation)}
          />
        </Tooltip>
      )}
    </Flex>
  )
}

Component.displayName = displayName
