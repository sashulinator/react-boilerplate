import { getBorder } from './get-border'

describe(`${getBorder?.name}`, () => {
  it('basic', async () => {
    const div = document.createElement('div')
    div.style.borderWidth = '4px'
    expect(getBorder(div)).toEqual({ bottom: 4, left: 4, right: 4, top: 4 })
    div.remove()
  })

  it('different border', async () => {
    const div = document.createElement('div')
    div.style.borderWidth = '1px 2px 3px 4px'
    expect(getBorder(div)).toEqual({ top: 1, right: 2, bottom: 3, left: 4 })
    div.remove()
  })

  it('different border 2', async () => {
    const div = document.createElement('div')
    div.style.borderTopWidth = '1px'
    div.style.borderRightWidth = '2px'
    div.style.borderBottomWidth = '3px'
    div.style.borderLeftWidth = '4.5px'
    expect(getBorder(div)).toEqual({ top: 1, right: 2, bottom: 3, left: 4.5 })
    div.remove()
  })
})
