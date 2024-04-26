import * as Storybook from 'utils/storybook'

import { notify } from '~/shared/notify'
import Button from '~/ui/button'
import { Close, Edit } from '~/ui/icon'
import Item, { Actions, Actors, Hidable, Title } from '~/ui/item'

interface State {
  variant: 'regular' | 'semitransparent'
  disabled: boolean
}

export default {
  getName: (): string => Item.displayName,

  getDescription: function Description(): JSX.Element {
    return (
      <>
        <h1>{Item.displayName}</h1>
         Элемент списка для сущностей
      </>
    )
  },

  element: function Element(props: Storybook.Props<State>): JSX.Element {
    const { state } = props

    return (
      <Item
        {...state}
        onItemClick={(): void => console.log('onItemClick')}
        index={0}
        buttons={<Actions onTrashClick={(): void => notify({ type: 'success', data: 'onTrashClick' })} />}
      >
        <Title flex='1' title='name' subtitle='keyName' url='#' strings={{ title: 'title', subtitle: 'subtitle' }} />
        <Actors
          flex='1'
          instance={{
            createDttm: '2023-10-25T13:17:32.186278374',
            updateDttm: '2023-10-27T09:48:18.63168951',
            createdBy: 'ashabetnik',
            updatedBy: 'ashabetnik',
          }}
        />
        <Hidable>
          <Button variant='ghost' round={true}>
            <Edit />
          </Button>
          <Button variant='ghost' round={true}>
            <Close />
          </Button>
        </Hidable>
      </Item>
    )
  },

  controls: [
    {
      name: 'variant',
      input: 'select',
      options: ['regular', 'semitransparent'],
      defaultValue: 'regular',
      style: { width: '200px' },
    },
    { name: 'disabled', input: 'checkbox', defaultValue: false },
  ],
} satisfies Storybook.Config<State>
