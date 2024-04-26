import { getComputedSize } from './get-computed-size'

describe(`${getComputedSize?.name}`, () => {
  it('basic border-box', async () => {
    const div = document.createElement('div')
    div.style.margin = '4px'
    div.style.padding = '4px'
    div.style.border = '4px'
    div.style.height = '200px'
    div.style.width = '100px'
    div.style.boxSizing = 'border-box'
    const size = getComputedSize(div, 'border-box')
    expect(size).toEqual({ width: 100, height: 200 })
    div.remove()
  })

  it('basic content-box', async () => {
    const div = document.createElement('div')
    div.style.margin = '4px'
    div.style.padding = '4px'
    div.style.border = '4px'
    div.style.height = '200px'
    div.style.width = '100px'
    div.style.boxSizing = 'content-box'
    const size = getComputedSize(div, 'content-box')
    expect(size).toEqual({ width: 100, height: 200 })
    div.remove()
  })

  it('style.boxSizing = "border-box" && requestedBoxSizing = content-box', async () => {
    const div = document.createElement('div')
    div.style.margin = '4px'
    div.style.padding = '4px'
    div.style.border = '4px'
    div.style.height = '200px'
    div.style.width = '100px'
    div.style.boxSizing = 'border-box'
    const size = getComputedSize(div, 'content-box')
    expect(size).toEqual({ width: 100 - 8 - 8, height: 200 - 8 - 8 })
    div.remove()
  })

  it('style.boxSizing = content-box && requestedBoxSizing = border-box with em', async () => {
    const div = document.createElement('div')
    const parentDiv = document.createElement('div')
    parentDiv.append(div)
    parentDiv.style.fontSize = '10px'
    div.style.margin = '4em'
    div.style.padding = '4em'
    div.style.border = '4em'
    div.style.height = '200em'
    div.style.width = '100em'
    div.style.boxSizing = 'content-box'

    const size = getComputedSize(div, 'border-box')
    expect(size).toEqual({ width: 1000 + 80, height: 2000 + 80 })
    div.remove()
  })
})
