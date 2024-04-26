import { useMemo } from 'react'
import * as Storybook from 'utils/storybook'

import { notify } from '~/shared/notify'
import Button from '~/ui/button'
import { Close, Edit } from '~/ui/icon'
import Item, { Actions, Actors, Hidable, List, Title } from '~/ui/item'

interface State {
  variant: 'regular' | 'semitransparent'
}

export default {
  getName: (): string => List.displayName,

  getDescription: function Description(): JSX.Element {
    return (
      <>
        <h1>{List.displayName}</h1>
         Элемент списка для сущностей
      </>
    )
  },

  element: function Element(props: Storybook.Props<State>): JSX.Element {
    const { state } = props

    const data = useMemo(getData, [])

    return (
      <List data={data}>
        {({ item, index }): JSX.Element => {
          return (
            <Item
              {...state}
              onItemClick={(): void => console.log('onItemClick')}
              index={index}
              buttons={<Actions onTrashClick={(): void => notify({ data: 'onTrashClick', type: 'success' })} />}
            >
              <Title
                flex='1'
                title={item.name}
                subtitle={item.keyName}
                strings={{ title: 'title', subtitle: 'subtitle' }}
                url='#'
              />
              <Actors flex='1' instance={item} />
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
        }}
      </List>
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

// Private

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function getData() {
  return Array(10)
    .fill(undefined)
    .map((_, index) => ({
      id: index,
      name: `name${index}`,
      keyName: `keyName${index}`,
      createDttm: '2023-10-25T13:17:32.186278374',
      updateDttm: '2023-10-27T09:48:18.63168951',
      createdBy: 'ashabetnik',
      updatedBy: 'ashabetnik',
    }))
}
