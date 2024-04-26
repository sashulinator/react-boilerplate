import '../modal-theme'

/**
 * ui
 */
export { default } from './ui/modal'
export type { Props as ModalProps } from './ui/modal'

/**
 * variants
 */
export { default as Dialog } from './variants/dialog'
export type { DialogProps } from './variants/dialog'

export { default as Form, default as FormModal } from './variants/form'
export type { FormProps } from './variants/form'

export { default as Registry, default as RegistryModal } from './variants/registry'
export type { RegistryProps } from './variants/registry'

/**
 * widgets
 */
export { default as Container, displayName as containerDisplayName } from './widgets/container'
export type { ContainerProps } from './widgets/container'
