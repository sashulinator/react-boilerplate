export type Route = {
  renderHeader?: unknown
  renderNav?: unknown
}

export function _createLayoutClass(currentRoute: undefined | Route): string {
  const layoutPartNames = ['main']

  if (currentRoute?.renderNav) {
    layoutPartNames.push('nav')
  }
  if (currentRoute?.renderHeader) {
    layoutPartNames.push('header')
  }

  return `${layoutPartNames.sort().join('-')}`
}
