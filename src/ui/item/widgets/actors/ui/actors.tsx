import dayjs from 'dayjs'

import Flex, { FlexProps } from '~/abstract/flex'
import Mark from '~/ui/mark'
import { c } from '~/utils/core'

export interface Props extends FlexProps {
  instance?:
    | {
        className?: string | undefined
        createdBy?: string | undefined
        updatedBy?: string | undefined
        createDttm?: string | undefined
        updateDttm?: string | undefined
      }
    | undefined
}

const displayName = 'ui-Item-w-Actors'

/**
 * Действующие лица и время
 */
export default function Component(props: Props): JSX.Element {
  const { instance, className, ...flexProps } = props

  return (
    <Flex
      className={c(className, displayName)}
      dir='column'
      justifyContent='start'
      alignItems='end'
      style={{ fontSize: '0.7rem' }}
      {...flexProps}
    >
      <Mark
        tooltipContent={
          <div style={{ width: 'max-content' }}>
            created
            <br />
            <span style={{ opacity: '0.7', fontSize: '0.7em', textTransform: 'uppercase' }}>
              time: {dayjs(instance?.createDttm).format('HH:mm')}
            </span>
          </div>
        }
      >
        {instance?.createdBy || 'неизветный'} {dayjs(instance?.createDttm).format('DD.MM.YYYY')}
      </Mark>
      <Mark
        tooltipContent={
          <div style={{ width: 'max-content' }}>
            updated
            <br />
            <span style={{ opacity: '0.7', fontSize: '0.7em', textTransform: 'uppercase' }}>
              time: {dayjs(instance?.updateDttm).format('HH:mm')}
            </span>
          </div>
        }
      >
        {instance?.updatedBy || 'неизветный'} {dayjs(instance?.updateDttm).format('DD.MM.YYYY')}
      </Mark>
    </Flex>
  )
}

Component.displayName = displayName
