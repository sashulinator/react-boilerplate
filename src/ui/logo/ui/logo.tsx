export interface Props {
  className?: string
  width?: string
  height?: string
}

const displayName = 'ui-Logo'

/**
 * Logo
 */
export default function Component(props: Props): JSX.Element {
  const { width, height, ...svgProps } = props
  return (
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 142 144' style={{ width, height }} fill='none' {...svgProps}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='m103.5 62 10.5 6.5 27.621 2.96c-.244-33.205-22.963-61.025-53.597-68.797v61.812L103.5 62ZM65.325.696c-3.098.23-6.14.66-9.115 1.278L82 64.475 65.325.696ZM38.113 8.419a70.893 70.893 0 0 0-8.335 5.09L76.5 66 38.113 8.42ZM16.829 25.334a71.727 71.727 0 0 0-6.439 8.793L73 69.5 16.829 25.334ZM3.035 50.04A71.438 71.438 0 0 0 .558 60.368L70.76 75 3.035 50.04ZM.123 80.532a71.622 71.622 0 0 0 1.933 10.094L70.76 80.532H.123Zm8.54 26.407c12.157 21.818 35.35 36.561 61.96 36.561h.137V86L8.663 106.939Zm73.554 35.612a70.12 70.12 0 0 0 10.45-2.564L74 99l8.217 43.551Zm19.789-6.397a70.767 70.767 0 0 0 8.954-5.306L77.5 99l24.506 37.154Zm16.374-11.245a71.68 71.68 0 0 0 6.711-7.042L81 98.5l37.38 26.409Zm12.511-15.093a71.395 71.395 0 0 0 4.271-7.973L84 96l46.891 13.816Zm7.771-17.316a71.995 71.995 0 0 0 2.959-21H114l-25.976 9.032L85 92.5h53.662Z'
        clipRule='evenodd'
      />
    </svg>
  )
}

Component.displayName = displayName
