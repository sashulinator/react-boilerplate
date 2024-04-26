import Flex, { FlexProps } from '~/abstract/flex'
import { ActionLink } from '~/ui/link'
import Mark from '~/ui/mark'
import { c } from '~/utils/core'
import { stopPropagation } from '~/utils/dom-event'

export interface Props extends FlexProps {
  url: string
  title: string
  subtitle?: string | undefined
  strings: {
    title: string
    subtitle?: string | undefined
  }
}

const displayName = 'ui-Item-w-Title'

/**
 * Actors
 */
export default function Component(props: Props): JSX.Element {
  const { url, subtitle, title, strings, className, ...flexProps } = props

  return (
    <Flex dir='column' {...flexProps} className={c(displayName, className)}>
      <ActionLink
        onActionClick={stopPropagation}
        tooltipContent={strings.title}
        style={{ wordBreak: 'break-all' }}
        to={url}
      >
        {title}
      </ActionLink>
      <Mark placement='tl' tooltipContent={strings.subtitle}>
        <span style={{ fontSize: '0.8em' }}>{subtitle}</span>
      </Mark>
    </Flex>
  )
}

Component.displayName = displayName
