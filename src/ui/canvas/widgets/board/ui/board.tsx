import { ForwardedRef, forwardRef } from 'react'

import { Board as AbstractBoard, BoardProps as AbstractBoardProps } from '~/abstract/canvas'
import { c } from '~/utils/core'

BoardComponent.displayName = 'a-CanvasBoard'

export type BoardProps = AbstractBoardProps

function BoardComponent(props: BoardProps, ref: ForwardedRef<HTMLElement>): JSX.Element {
  return (
    <AbstractBoard
      {...props}
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
      ref={ref as any}
      className={c(props.className, BoardComponent.displayName)}
      style={{ touchAction: 'none', outline: 'none' }}
    >
      {props.children}
    </AbstractBoard>
  )
}

const Board = forwardRef<HTMLElement, BoardProps>(BoardComponent)
Board.displayName = BoardComponent.displayName
export { Board }
