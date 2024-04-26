import Flex from '~/abstract/flex'
import { tName, tStrings, useT } from '~/lib/i18n'
import { toClipboard } from '~/lib/navigator'
import Button from '~/ui/button'
import { H2 } from '~/ui/heading'
import { Share } from '~/ui/icon'
import Mark from '~/ui/mark'
import Tooltip from '~/ui/tooltip'
import { c } from '~/utils/core'

export interface Props {
  className?: string | undefined
  title: string
  name?: string | undefined
  children: React.ReactNode
  titleChildren?: React.ReactNode
  url: string
}

const displayName = 'ui-Layout-v-Form'

/**
 * Form
 */
export default function Component(props: Props): JSX.Element {
  const t = useT(tStrings, tName)

  return (
    <Flex className={c(props.className, displayName)} width='100%' dir='column'>
      <Flex width='100%' alignItems='center' justifyContent='space-between'>
        <Flex alignItems='center' gap='s'>
          <H2>
            {props.title}{' '}
            {props.name && (
              <Mark transparent={false} tooltipContent={t.field.name()}>
                {props.name}
              </Mark>
            )}
          </H2>
          {props.url && (
            <Tooltip contents={'Копировать ссылку'}>
              <div style={{ transform: 'translateY(-10px) scale(0.9)' }}>
                <Button round={true} height='s' variant='regular' onClick={(): void => toClipboard(props.url)}>
                  <Share />
                </Button>
              </div>
            </Tooltip>
          )}
        </Flex>
        {props.titleChildren}
      </Flex>
      {props.children}
    </Flex>
  )
}

Component.displayName = displayName
