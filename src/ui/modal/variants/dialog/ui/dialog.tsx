import './dialog.css'

import Flex from '~/abstract/flex'
import Button from '~/ui/button'
import Modal, { ModalProps } from '~/ui/modal'
import { c } from '~/utils/core'
import { stopPropagation } from '~/utils/dom-event'

export interface Props extends ModalProps {
  onOk: () => void
  onCancel: () => void
}

Dialog.displayName = 'ui-Modal-v-Dialog'

function Dialog(props: Props): JSX.Element {
  const { children, ...modalProps } = props
  return (
    <Modal className={c(Dialog.displayName, props.className)} {...modalProps}>
      <Flex dir='column' padding='0 var(--xl)' gap='xxl' onClick={stopPropagation}>
        <Flex>{children}</Flex>
        <Flex width='100%' gap='l' crossAxis='center' mainAxis='end'>
          <Button variant='ghost' onClick={props.onCancel}>
            Нет
          </Button>
          <Button variant='primary' onClick={props.onOk}>
            Да
          </Button>
        </Flex>
      </Flex>
    </Modal>
  )
}

export default Dialog
