import Flex from '~/abstract/flex'
import { toClipboard } from '~/lib/navigator'
import Button from '~/ui/button'
import { Share } from '~/ui/icon'
import Mark from '~/ui/mark'
import Tooltip from '~/ui/tooltip'
import { Nil, c } from '~/utils/core'

import H1, { H1Props } from '../../h1'
import H2 from '../../h2'

export interface Props extends H1Props {
  url: string
  heading?: 'h1' | 'h2' | undefined
  name?: string | Nil
  fieldName?: string | undefined
}

const displayName = 'ui-Heading-v-Sharable'

/**
 * Sharable
 */
export default function Component(props: Props): JSX.Element {
  const { heading = 'h1', name, fieldName, ...headingProps } = props

  const Heading = heading === 'h1' ? H1 : H2

  return (
    <Flex>
      <Heading {...headingProps} className={c(displayName)}>
        {props.children}{' '}
        {name && (
          <Mark transparent={false} tooltipContent={fieldName}>
            {name}
          </Mark>
        )}
        <Tooltip contents={'Копировать ссылку'}>
          <div style={{ transform: 'translateY(-8px) scale(0.8)', display: 'inline-block' }}>
            <Button round={true} height='s' variant='regular' onClick={(): void => toClipboard(props.url)}>
              <Share />
            </Button>
          </div>
        </Tooltip>
      </Heading>
    </Flex>
  )
}

Component.displayName = displayName
