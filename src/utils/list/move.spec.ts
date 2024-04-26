import { move } from './move'

describe(move.name, () => {
  it('basic', () => {
    const list = ['a', 'b', 'c', 'd', 'e', 'f']
    const newList = move(list, 1, 3)
    expect(newList).toEqual(['a', 'c', 'd', 'b', 'e', 'f'])
  })
})
