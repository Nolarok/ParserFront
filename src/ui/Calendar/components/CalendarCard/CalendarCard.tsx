import React, { CSSProperties } from 'react'
import { block } from '@/helpers/bem'
import css from './CalendarCard.scss'

const b = block('container', css)

export enum CardTheme {
  BASIC = 'basic',
  BLUE = 'blue',
  RED = 'red',
  GREEN = 'green',
}

type Props = {
  style?: CSSProperties
  height?: number
  top?: number
  title?: string
  theme?: CardTheme
  text?: React.ReactNode
  renderIcon?: (className: string) => React.ReactNode
}

export const CalendarCard: React.FC<Props> = props => {
  const { style, height, top, title, renderIcon, text, theme } = props

  return (
    <div style={style} className={b({ theme })}>
      <div style={{ height, top: `${top}%` }} className={b('card')}>
        {renderIcon && renderIcon(b('icon'))}
        <div className={b('title')}>{title}</div>
        <div className={b('text')}>{text}</div>
      </div>
    </div>
  )
}
