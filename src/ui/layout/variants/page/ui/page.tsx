import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

import Flex from '~/abstract/flex'
import { NAME_PARAM } from '~/constants/search-params'

export interface Props {
  className?: string | undefined
  title?: React.ReactNode
  children?: React.ReactNode
  name?: string | undefined
}

const displayName = 'ui-Layout-v-Page'

/**
 * PageFallback
 */
export default function Component(props: Props): JSX.Element {
  const [urlParams] = useSearchParams({ [NAME_PARAM]: '' })
  const name = props.name || urlParams.get(NAME_PARAM) || ''

  useEffect(setDocumentTitle, [name])

  return (
    <Flex className={displayName} as='main' padding='var(--xxxl) var(--xxxl) 30vh var(--s)' dir='column' gap='xxxl'>
      <Flex width='100%' alignItems='center' justifyContent='space-between'>
        {props.title}
      </Flex>
      {props.children}
    </Flex>
  )

  function setDocumentTitle(): void {
    if (!name) return
    document.title = `Colibri | ${name}`
  }
}

Component.displayName = displayName
