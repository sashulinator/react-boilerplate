import './index.css'

// TODO change name to less stupid
export interface GetClassnamesProps {
  height?: 's' | 'm' | 'l' | null | undefined
  padding?: 's' | 'm' | 'l' | null | undefined
  square?: boolean | undefined
  round?: boolean | undefined
}

export function getClassnames(props: GetClassnamesProps): string[] {
  const classnames = ['Button']

  if (props.height) {
    classnames.push(`--${props.height}`)
  }
  if (props.square) {
    classnames.push(`--square`)
  }
  if (props.round) {
    classnames.push(`--square --round`)
  }
  if (props.padding && !props.round && !props.square) {
    classnames.push(`--padding`)
  }

  return classnames
}
