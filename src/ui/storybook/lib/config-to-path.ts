import * as Storybook from 'utils/storybook'

export function configToPath(config: Pick<Storybook.Config<unknown>, 'getPath' | 'getName'>): string {
  return config.getPath?.() ?? `${config.getName().toLowerCase()}`
}
