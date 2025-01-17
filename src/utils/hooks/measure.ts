import { useEffect, useState } from 'react'

import { observeResize } from '../dom'
import { Size } from '../dom/types/size'
import { useForceUpdate } from './force-update'

export function useMeasure(): [(ref: Element) => void, Size] {
  const [measureRef, setMeasureRef] = useState<Element | null>(null)
  const update = useForceUpdate()
  const styles = measureRef ? getComputedStyle(measureRef) : null

  const height = parseFloat(styles?.height || '') || 0
  const width = parseFloat(styles?.width || '') || 0

  useEffect(() => observeResize(measureRef, update), [measureRef])

  return [setMeasureRef, { height, width }]
}
