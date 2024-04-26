import { ActionHistory } from './action-history'
import { Action } from './types/step'

describe(ActionHistory.name, () => {
  it('basic', () => {
    const next: Action<{ next: string }> = {
      id: 'test',
      done: false,
      username: 'next',
      name: 'test',
      redos: [
        {
          type: 'next',
          payload: 'next',
          historical: true,
        },
      ],
      undos: [
        {
          type: 'next',
          payload: 'next',
          historical: true,
        },
      ],
    }
    const current: Action<{ next: string }> = {
      id: 'test',
      done: true,
      username: 'current',
      name: 'test',
      redos: [
        {
          type: 'next',
          payload: 'next',
          historical: true,
        },
      ],
      undos: [
        {
          type: 'next',
          payload: 'next',
          historical: true,
        },
      ],
    }
    const previous: Action<{ next: string }> = {
      id: 'test',
      done: true,
      username: 'previous',
      name: 'test',
      redos: [
        {
          type: 'next',
          payload: 'next',
          historical: true,
        },
      ],
      undos: [
        {
          type: 'next',
          payload: 'next',
          historical: true,
        },
      ],
    }
    const actions = [next, current, previous]
    const h = new ActionHistory<{ next: string }>({ actions, dispatchers: { next: () => {} } })

    expect(h.findCurrent()).toEqual(current)
    expect(h.findNext()).toEqual(next)
    expect(h.findPrevious()).toEqual(previous)
  })

  it('all false', () => {
    const item1: Action<{ next: string }> = {
      id: 'test',
      done: false,
      name: 'test',
      username: 'item1',
      redos: [
        {
          type: 'next',
          payload: 'next',
          historical: true,
        },
      ],
      undos: [
        {
          type: 'next',
          payload: 'next',
          historical: true,
        },
      ],
    }
    const item2: Action<{ next: string }> = {
      id: 'test',
      done: false,
      name: 'test',
      username: 'item2',
      redos: [
        {
          type: 'next',
          payload: 'next',
          historical: true,
        },
      ],
      undos: [
        {
          type: 'next',
          payload: 'next',
          historical: true,
        },
      ],
    }
    const item3: Action<{ next: string }> = {
      id: 'test',
      done: false,
      name: 'test',
      username: 'item3',
      redos: [
        {
          type: 'next',
          payload: 'next',
          historical: true,
        },
      ],
      undos: [
        {
          type: 'next',
          payload: 'next',
          historical: true,
        },
      ],
    }
    const actions = [item1, item2, item3]
    const h = new ActionHistory<{ next: string }>({ actions, dispatchers: { next: () => {} } })

    expect(h.findCurrent()).toEqual(undefined)
    expect(h.findNext()).toEqual(item3)
    expect(h.findPrevious()).toEqual(undefined)
  })
})
