export function move<T>(arr: T[], fromIndex: number, toIndex: number): T[] {
  const clone = [...arr]
  var element = clone[fromIndex]
  clone.splice(fromIndex, 1)
  clone.splice(toIndex, 0, element)
  return clone
}
