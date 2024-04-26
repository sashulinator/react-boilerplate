import Flex from '~/abstract/flex'
import Scrollbar from '~/ui/scrollbar'
import { c } from '~/utils/core'
import { stopPropagation } from '~/utils/dom-event'
import { useWindowSize } from '~/utils/hooks'

import Modal, { Props as ModalProps } from '../../../ui/modal'

export interface Props extends ModalProps {
  className?: string
}

const displayName = 'ui-Modal-v-Registry'

/**
 * Modal Registry
 */
export default function Component(props: Props): JSX.Element {
  const { width = 1024 } = useWindowSize()

  const newWidth = `${width > 1224 ? 1024 : width - 150}px`
  const deps = [newWidth, ...(props.deps || [])]

  return (
    <Modal {...props} className={c(props.className, displayName)} deps={deps}>
      <Flex width={newWidth} height='90vh' style={{ borderRadius: 'var(--xxl)', overflow: 'hidden' }}>
        <Scrollbar>
          <Flex
            width={newWidth}
            padding='var(--xxxl)'
            dir='column'
            onClick={stopPropagation}
            style={{
              // border: '1px solid var(--bgSecondary)',
              background: 'var(--Modal-content_bg)',
              borderRadius: 'var(--xxl)',
            }}
          >
            {props.children}
          </Flex>
        </Scrollbar>
      </Flex>
    </Modal>
  )
}

Component.displayName = displayName
