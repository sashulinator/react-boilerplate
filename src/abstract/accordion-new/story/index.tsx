import * as Storybook from 'utils/storybook'

import { H1 } from '~/ui/heading'

import Accordion from '../ui/accordion'

interface State {
  expanded: boolean
  controlled: boolean
  content: boolean
  animation: boolean
  height: 's' | 'm' | 'l'
}

export default {
  getName: (): string => Accordion.displayName,

  getDescription: function Description(): JSX.Element {
    return (
      <>
        <H1>{this.getName()}</H1>
        Добавьте описание
      </>
    )
  },

  element: function Element(props: Storybook.Props<State>): JSX.Element {
    const {
      state: { controlled, expanded, animation, content, height },
      setState,
    } = props

    function toggleExpanded(): void {
      setState((s) => ({ ...s, expanded: !expanded }))
    }

    return (
      <Accordion
        height={height}
        onExpandedChange={controlled ? toggleExpanded : undefined}
        isExpanded={controlled ? expanded : undefined}
        renderHeader={_Header}
        headerProps={{ title: 'title' }}
        renderContent={_Content}
        contentProps={{ content }}
        style={{ border: '2px solid blue' }}
        collapseProps={{
          from: animation ? { opacity: expanded ? 0 : 1, y: 0 } : undefined,
          to: animation ? { opacity: expanded ? 1 : 0, y: expanded ? 0 : 20 } : undefined,
        }}
      />
    )
  },

  controls: [
    { name: 'expanded', input: 'checkbox', defaultValue: true },
    { name: 'controlled', input: 'checkbox', defaultValue: true },
    { name: 'content', input: 'checkbox', defaultValue: false },
    { name: 'animation', input: 'checkbox', defaultValue: false },
    {
      name: 'height',
      input: 'select',
      options: ['s', 'm', 'l'],
      defaultValue: 's',
      style: { width: '200px' },
    },
  ],
} satisfies Storybook.Config<State>

/**
 * Private
 */

interface _HeaderProps {
  title: string
  isExpanded: boolean
  setExpanded: (isExpanded: boolean) => void
}

function _Header(props: _HeaderProps): JSX.Element {
  return (
    <div className='test-Header' style={{ border: '1px solid red' }}>
      {props.title}
      <button onClick={(): void => props.setExpanded(!props.isExpanded)}>{props.isExpanded ? 'X' : 'O'}</button>
    </div>
  )
}

interface _ContentProps {
  content: boolean
  isExpanded: boolean
  setExpanded: (isExpanded: boolean) => void
}

function _Content(props: _ContentProps): JSX.Element {
  return (
    <div className='test-Body' style={{ border: '1px solid red' }}>
      Hello world
      {props.content && (
        <>
          <br />
          MoreContent
          <br />
          <button onClick={(): void => props.setExpanded(false)}>collapse</button>
        </>
      )}
    </div>
  )
}
