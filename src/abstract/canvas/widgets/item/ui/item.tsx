import { ForwardedRef, forwardRef } from 'react'

import { Id, c } from '~/utils/core'
import { useMeasure } from '~/utils/hooks'
import { setRefs } from '~/utils/react'

export interface Props extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  /**
   * Дети
   */
  children: React.ReactNode

  /**
   * Положение на конве по X
   */
  x: number | string

  /**
   * Положение на конве по X
   */
  y: number | string

  /**
   * Id компонента
   * Может использоваться для центрования конвы на элементе
   */
  dataId: Id

  /**
   * Пропсы для обертки SVGForeignObjectElement
   */
  rootProps?: React.HTMLAttributes<SVGForeignObjectElement>
}

const displayName = 'a-Canvas-w-Item'

/**
 * Canvas Item Component
 * Отрисовывает HTMLElement'ы в заданных координатах
 *
 * @deprecated
 *
 * 🔴 Внутри foreignObject нельзя использовать CSS свойства position и transform
 * так как они работают некорректно в Safary
 */
function Component(props: Props, ref: ForwardedRef<HTMLDivElement>): JSX.Element {
  const { x, y, dataId, rootProps, ...divProps } = props

  const [setMeasureRef, { height, width }] = useMeasure()

  return (
    <foreignObject data-id={dataId} x={x} y={y} height={height} width={width} {...rootProps}>
      <div
        {...divProps}
        className={c(props.className, displayName)}
        style={{ height: 'fit-content', width: 'fit-content', ...props.style }}
        ref={setRefs(setMeasureRef, ref)}
      >
        {props.children}
      </div>
    </foreignObject>
  )
}

const ForwardRef = forwardRef(Component)
ForwardRef.displayName = displayName
export default ForwardRef
