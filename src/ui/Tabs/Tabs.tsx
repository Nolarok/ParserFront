import React from 'react'
import cn from 'classnames'
import { block } from '@/helpers/bem'
import { IOption } from '@/types'
import css from './Tabs.scss'

let b = block('tabs', css)

export enum TabsTheme {
  RED = 'red',
  BLUE = 'blue',
}

type Props = {
  theme?: TabsTheme
  className?: string
  tabs: IOption[]
  active?: string
  onChange: (value: string) => void
  underlinedStyle?: boolean
}

export const Tabs: React.FC<Props> = props => {
  const { tabs, onChange, className, active, theme, underlinedStyle = false } = props

  if (underlinedStyle) {
    b = block('tabsUnderlined', css)
  }

  return (
    <div className={cn(b(), className)}>
      {tabs.map((item, index) => (
        <button
          key={index}
          className={b('tab', {
            theme,
            active: active === item.value,
          })}
          type="button"
          onClick={() => onChange(item.value)}
        >
          <span className={b('inner')}>{item.label}</span>
        </button>
      ))}
    </div>
  )
}
