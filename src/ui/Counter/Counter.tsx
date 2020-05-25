import React from 'react'
import cn from 'classnames'
import css from './Counter.scss'
import { block } from '@/helpers/bem'

const b = block('counter', css)

export enum CounterColor {
  RED = 'red',
  BLACK = 'black',
}

type Props = {
  count: number
  color?: CounterColor
  children?: React.ReactNode
  className?: string
  counterClass?: string
}

export const Counter: React.FC<Props> = props => {
  const { count, color = CounterColor.RED, children, className, counterClass } = props

  return (
    <div className={cn(className, b())}>
      {children}
      <div
        className={cn(
          b('inner', {
            color,
            hide: !count,
          }),
          counterClass
        )}
      >
        {count}
      </div>
    </div>
  )
}
