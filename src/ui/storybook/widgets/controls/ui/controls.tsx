import './controls.scss'

import { createElement } from 'react'
import * as Storybook from 'utils/storybook'

import Checkbox from '~/ui/checkbox'
import Labeled from '~/ui/labeled'
import TextInput from '~/ui/text-input'
import { Any, SetterOrUpdater, c } from '~/utils/core'
import { getPath, setPath } from '~/utils/dictionary'

import Select from '../../select'

export interface Props {
  className?: string
  controls: Storybook.Control[]
  state: Record<string, Any>
  setState: SetterOrUpdater<Record<string, Any>>
}

const displayName = 'ui-Storybook-w-Controls'

export default function Component(props: Props): JSX.Element[] {
  return props.controls.map((control, i) => {
    return <Control key={i} state={props.state} setState={props.setState} control={control} />
  })
}

interface ControlProps {
  control: Storybook.Control
  state: Record<string, Any>
  setState: SetterOrUpdater<Record<string, Any>>
}

function Control(props: ControlProps): JSX.Element {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { name, input, path, defaultValue: _, ...controlProps } = props.control

  return (
    <div className={c(displayName)}>
      <Labeled className='label' direction='horizontal' label={name || 'UNKNOWN'}>
        {((): React.ReactNode => {
          if (input === 'checkbox') {
            return createElement(Checkbox, {
              ...controlProps,
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              checked: getPath(props.state, path || [name]) || false,
              onChange: (e) => {
                props.setState((state) => setPath(path || [name], e.target.checked, state))
              },
            })
          }

          if (input === 'select') {
            return createElement(Select, {
              ...controlProps,

              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              value: getPath(props.state, path || [name]),
              placeholder: name,
              onChange: (e) => {
                props.setState((state) => setPath(path || [name], e.target.value, state))
              },
            })
          }

          if (input === 'input') {
            return createElement(TextInput, {
              ...controlProps,

              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              value: getPath(props.state, path || [name]),
              placeholder: name,
              onChange: (e) => {
                props.setState((state) => setPath(path || [name], e.target.value, state))
              },
            })
          }
        })()}
      </Labeled>
    </div>
  )
}

Control.displayName = displayName
