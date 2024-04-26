import { getPadding } from './get-padding'

describe(`${getPadding?.name}`, () => {
  it('basic', async () => {
    const div = document.createElement('div')
    div.style.padding = '4px'
    expect(getPadding(div)).toEqual({ bottom: 4, left: 4, right: 4, top: 4 })
    div.remove()
  })

  it('different paddings', async () => {
    const div = document.createElement('div')
    div.style.padding = '1px 2px 3px 4px'
    expect(getPadding(div)).toEqual({ top: 1, right: 2, bottom: 3, left: 4 })
    div.remove()
  })

  it('different paddings 2', async () => {
    const div = document.createElement('div')
    div.style.paddingTop = '1px'
    div.style.paddingRight = '2px'
    div.style.paddingBottom = '3px'
    div.style.paddingLeft = '4.5px'
    expect(getPadding(div)).toEqual({ top: 1, right: 2, bottom: 3, left: 4.5 })
    div.remove()
  })

  it('padding with em', async () => {
    const div = document.createElement('div')
    const parentDiv = document.createElement('div')
    parentDiv.append(div)
    parentDiv.style.fontSize = '10px'
    div.style.paddingTop = '1em'
    div.style.paddingRight = '2em'
    div.style.paddingBottom = '3em'
    div.style.paddingLeft = '4.5em'
    expect(getPadding(div)).toEqual({ top: 10, right: 20, bottom: 30, left: 45 })
    div.remove()
  })
})
