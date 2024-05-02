import Flex from '~/abstract/flex'
import Button from '~/ui/button'
import { Close } from '~/ui/icon'
import { c } from '~/utils/core'

export interface Props {
  className?: string | undefined
  onCloseClick?: ((e: React.MouseEvent) => void) | undefined
}

const displayName = 'ui-Item-w-Picked'

/**
 * Действующие лица и время
 */
export default function Component(props: Props): JSX.Element {
  const { className, onCloseClick, ...flexProps } = props

  return (
    <Flex
      className={c(className, displayName)}
      justifyContent='start'
      alignItems='center'
      padding='0 0 0 var(--m)'
      style={{
        color: 'var(--primary)',
        fontSize: '0.7rem',
        position: 'absolute',
        left: 0,
        top: 'calc(var(--xl) * -1)',
        border: '1px solid var(--primary)',
        borderRadius: 'var(--s)',
      }}
      {...flexProps}
    >
      <span>picked</span>
      <Button style={{ transform: 'scale(0.7)', opacity: '0.6' }} round={true} variant='ghost' height='s'>
        <Close onClick={onCloseClick} />
      </Button>
    </Flex>
  )
}

Component.displayName = displayName
