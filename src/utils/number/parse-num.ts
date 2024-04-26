export function parseNum(num: string | number | undefined | null = '', defaultNumber = 0): number {
  if (num === undefined || num === null) {
    return defaultNumber
  }

  return parseInt(num.toString(), 10) || defaultNumber
}
