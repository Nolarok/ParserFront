import React from 'react'
import cn from 'classnames'
import { block } from '@/helpers/bem'
import { IOption } from '@/types'
import css from './Tags.scss'

const b = block('tags', css)

export enum TagsTheme {
  RED = 'red',
  BLUE = 'blue',
}

type Props = {
  theme?: TagsTheme
  className?: string
  tags: IOption[]
  active?: string
  onChange: (value: string) => void
}

export const Tags: React.FC<Props> = props => {
  const { tags, onChange, className, active, theme } = props

  return (
    <div className={cn(b(), className)}>
      {tags.map((item, index) => (
        <button
          key={index}
          className={b('tag', {
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
