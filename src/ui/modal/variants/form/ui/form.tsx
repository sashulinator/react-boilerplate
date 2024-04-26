import Flex from '~/abstract/flex'
import Scrollbar from '~/ui/scrollbar'
import { c } from '~/utils/core'
import { stopPropagation } from '~/utils/dom-event'

import Modal, { Props as ModalProps } from '../../../ui/modal'

export interface Props extends ModalProps {
  className?: string
}

const displayName = 'ui-Modal-v-Form'

/**
 * Modal Form
 */
export default function Component(props: Props): JSX.Element {
  return (
    <Modal {...props} className={c(props.className, displayName)}>
      <Flex width='35rem' height='90vh' style={{ borderRadius: 'var(--xxl)', overflow: 'hidden' }}>
        <Scrollbar>
          <Flex
            width='35rem'
            padding='var(--xxxl)'
            dir='column'
            onClick={stopPropagation}
            gap='xxxl'
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
