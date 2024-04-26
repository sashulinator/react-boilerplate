import { memo } from 'react'

import { IconProps } from '../ui/icon'

// https://www.svgrepo.com/svg/471638/log-out-01

export function LogoComponent(props: IconProps): JSX.Element {
  return (
    <svg data-palette-color='var(--primary)' viewBox='1.9 -39.45 143.89 40.05' {...props}>
      <path
        fill='var(--primary)'
        d='m18.65-6.35 3.5 4.4Q20.7-.8 18.53-.1q-2.18.7-4.28.7Q10.5.6 7.73-.78q-2.78-1.37-4.3-3.95Q1.9-7.3 1.9-10.95t1.65-6.23q1.65-2.57 4.33-3.92 2.67-1.35 5.62-1.35t5.13.8q2.17.8 3.72 2.1l-3.4 4.5q-.7-.55-1.92-1.13-1.23-.57-2.88-.57-1.45 0-2.65.75t-1.9 2.05q-.7 1.3-.7 3 0 1.6.75 2.95t2.08 2.12q1.32.78 3.12.78 1.15 0 2.13-.33.97-.32 1.67-.92ZM36.75.6Q33.7.6 31.22-.63 28.75-1.85 27.3-4.4q-1.45-2.55-1.45-6.5 0-3.7 1.5-6.4t3.95-4.18q2.45-1.47 5.2-1.47 3.25 0 4.92 1.07 1.68 1.08 2.78 2.38l-.3.85.65-3.2h6.5V0h-7v-4.75l.55 1.5q-.1 0-.6.57-.5.58-1.48 1.35-.97.78-2.4 1.36Q38.7.6 36.75.6Zm2-5.7Q40-5.1 41-5.48q1-.37 1.75-1.1.75-.72 1.3-1.82v-5.35q-.4-1.1-1.2-1.88-.8-.77-1.9-1.19-1.1-.43-2.45-.43-1.5 0-2.78.77-1.27.78-2.02 2.13-.75 1.35-.75 3.1t.8 3.15q.8 1.4 2.12 2.2 1.33.8 2.88.8ZM58.25 0v-39.45h7V0h-7Zm14.19 0v-21.85h7V0h-7Zm-.15-29.6q0-1.55 1.23-2.55 1.22-1 2.62-1 1.4 0 2.58 1 1.17 1 1.17 2.55 0 1.55-1.17 2.52-1.18.98-2.58.98-1.4 0-2.62-.98-1.23-.97-1.23-2.52ZM100.99.6q-2.75 0-4.62-.93-1.88-.92-3.28-2.42l.55-1.5V0h-7v-39.45h6.95v21.35-2.25q1.3-1.1 3.45-1.85 2.15-.75 4.9-.75 2.85 0 5.2 1.35t3.78 3.92q1.42 2.58 1.42 6.28T110.77-5q-1.58 2.7-4.18 4.15-2.6 1.45-5.6 1.45Zm-1.55-5.9q1.55 0 2.88-.8 1.32-.8 2.12-2.2.8-1.4.8-3.15t-.8-3.1q-.8-1.35-2.12-2.13-1.33-.77-2.88-.77-1.35 0-2.52.42-1.18.43-2 1.2-.83.78-1.28 1.88v5.35q.6 1.1 1.43 1.82.82.73 1.92 1.1 1.1.38 2.45.38Zm18.4-16.55h6.3l.65 6-.15-.9q.95-1.95 2.6-3.33 1.65-1.37 3.27-2.12 1.63-.75 2.48-.75l-.35 7q-2.45-.3-4.2.8t-2.7 2.9q-.95 1.8-.95 3.7V0h-6.95v-21.85ZM138.34 0v-21.85h7V0h-7Zm-.15-29.6q0-1.55 1.22-2.55 1.23-1 2.63-1t2.57 1q1.18 1 1.18 2.55 0 1.55-1.18 2.52-1.17.98-2.57.98t-2.63-.98q-1.22-.97-1.22-2.52Z'
        className='wordmark-text-0'
        data-fill-palette-color='primary'
      />
    </svg>
  )
}

export const Logo = memo(LogoComponent)