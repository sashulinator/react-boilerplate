import { c } from 'utils/core'
import * as Storybook from 'utils/storybook'

import Link from '~/ui/link'

import { configToPath } from '../../../../../lib'

ConfigLink.displayName = 'ConfigLink'

export interface Props {
  className?: string
  config: Pick<Storybook.Config<unknown>, 'getPath' | 'getName'>
}

export default function ConfigLink(props: Props): JSX.Element {
  return (
    <Link className={c(props.className, ConfigLink.displayName)} to={`/storybook/${configToPath(props.config)}`}>
      {props.config.getName()}
    </Link>
  )
}
