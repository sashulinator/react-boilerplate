import { getMargin } from './get-margin'

describe(`${getMargin?.name}`, () => {
  it('basic', async () => {
    const div = document.createElement('div')
    div.style.margin = '4px'
    expect(getMargin(div)).toEqual({ bottom: 4, left: 4, right: 4, top: 4 })
    div.remove()
  })

  it('different margins', async () => {
    const div = document.createElement('div')
    div.style.margin = '1px 2px 3px 4px'
    expect(getMargin(div)).toEqual({ top: 1, right: 2, bottom: 3, left: 4 })
    div.remove()
  })

  it('different margins 2', async () => {
    const div = document.createElement('div')
    div.style.marginTop = '1px'
    div.style.marginRight = '2px'
    div.style.marginBottom = '3px'
    div.style.marginLeft = '4.5px'
    expect(getMargin(div)).toEqual({ top: 1, right: 2, bottom: 3, left: 4.5 })
    div.remove()
  })
})
