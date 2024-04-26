import './field.scss'

import { ReactNode } from 'react'

import AbstractField, { FieldProps as AbstractFieldProps } from '~/abstract/field'
import Flex from '~/abstract/flex'
import Spinner from '~/ui/spinner'
import { c } from '~/utils/core'

import '../themes'

const displayName = 'ui-Field'

export interface Props extends Omit<AbstractFieldProps, 'height'> {
  height?: 'm' | 's' | 'l' | null
  isLoading?: boolean | undefined
  /** mainBg - bg как у main приложения */
  variant?: ('transparent' | 'insetFocus' | 'mainBg')[] | undefined
}

export default function Component(props: Props): JSX.Element {
  const { height = 'm', isLoading, ...fieldProps } = props

  return (
    <AbstractField height={height || undefined} {...fieldProps} className={c(props.className, displayName)}>
      <_IsLoading isLoading={isLoading} {...fieldProps} />
    </AbstractField>
  )
}

Component.displayName = displayName

// Private

export function _IsLoading(props: Props): ReactNode {
  if (!props.isLoading) return props.children

  return (
    <Flex width='100%' justifyContent='end' height='100%' style={{ position: 'relative' }}>
      <div style={{ position: 'absolute', top: '50%', right: '1rem', transform: 'translateY(-60%)' }}>
        <Spinner size='s' />
      </div>
      <div style={{ visibility: 'hidden', width: '100%', height: '100%' }}>{props.children}</div>
    </Flex>
  )
}
