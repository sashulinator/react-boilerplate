import * as Storybook from 'utils/storybook'

import Collapse from '../ui/collapse'

interface State {
  expanded: boolean
  content: boolean
  animation: boolean
}

export default {
  getName: (): string => Collapse.displayName || '',

  getDescription: function Description(): JSX.Element {
    return (
      <>
        <h1>{this.getName()}</h1>
        <p>A component for smooth rendering of content based on its height.</p>
      </>
    )
  },

  element: function Element(props: Storybook.Props<State>): JSX.Element {
    const {
      state: { expanded, animation, content },
    } = props

    return (
      <Collapse
        isExpanded={expanded}
        from={animation ? { opacity: expanded ? 0 : 1, y: 0 } : undefined}
        to={animation ? { opacity: expanded ? 1 : 0, y: expanded ? 0 : 20 } : undefined}
        style={{ background: 'blue' }}
      >
        <p>Hello</p>
        <p>World</p>
        {content && (
          <>
            <p>How</p>
            <p>Are</p>
            <p>You</p>
          </>
        )}
      </Collapse>
    )
  },

  controls: [
    { name: 'expanded', input: 'checkbox', defaultValue: true },
    { name: 'content', input: 'checkbox', defaultValue: true },
    { name: 'animation', input: 'checkbox', defaultValue: false },
  ],
} satisfies Storybook.Config<State>
