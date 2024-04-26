import dayjs from 'dayjs'
import { memo } from 'react'

import Flex from '~/abstract/flex'
import Mark from '~/ui/mark'
import { c } from '~/utils/core'

export interface Props {
  className?: string
  createdBy?: string | undefined
  updatedBy?: string | undefined
  createDttm?: string | undefined
  updateDttm?: string | undefined
  width: string
}

const displayName = 'ui-Registry-w-Item-w-Actors'

/**
 * Actors
 */
function Component(props: Props): JSX.Element {
  return (
    <Flex
      dir='column'
      style={{ fontSize: '0.7rem', width: props.width }}
      mainAxis='start'
      crossAxis='end'
      className={c(props.className, displayName)}
    >
      <Mark
        tooltipContent={
          <div style={{ width: 'max-content' }}>
            Создано
            <br />
            <span style={{ opacity: '0.7', fontSize: '0.7em', textTransform: 'uppercase' }}>
              Время: {dayjs(props.createDttm).format('HH:mm')}
            </span>
          </div>
        }
      >
        <Flex as='span' style={{ textAlign: 'end', width: 'fit-content' }}>
          {props.createdBy || 'неизветный'} {dayjs(props.createDttm).format('DD.MM.YYYY')}
        </Flex>
      </Mark>
      <Mark
        tooltipContent={
          <div style={{ width: 'max-content' }}>
            Изменено
            <br />
            <span style={{ opacity: '0.7', fontSize: '0.7em', textTransform: 'uppercase' }}>
              Время: {dayjs(props.updateDttm).format('HH:mm')}
            </span>
          </div>
        }
      >
        <Flex as='span' style={{ textAlign: 'end', width: 'fit-content' }}>
          {props.updatedBy || 'неизветный'} {dayjs(props.updateDttm).format('DD.MM.YYYY')}
        </Flex>
      </Mark>
    </Flex>
  )
}

Component.displayName = displayName
export const Actors = memo(Component)
