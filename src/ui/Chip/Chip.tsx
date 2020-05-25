import React from 'react'
import cn from 'classnames'
import { block } from '@/helpers/bem'
import css from './Chip.scss'

const b = block('chip', css)

export enum ChipTheme {
  RED = 'red',
  BLUE = 'blue',
}

type Props = {
  className?: string
  value: string
  checked?: boolean
  onChange: (value: string) => void
  theme?: ChipTheme
}

export const Chip: React.FC<Props> = props => {
  const { value, children, checked, onChange, className, theme = ChipTheme.RED } = props

  return (
    <label className={cn(b({ theme }), className)}>
      <input
        type="checkbox"
        className={b('input')}
        onChange={() => onChange(value)}
        checked={checked}
      />
      <span className={b('text')}>{children}</span>
    </label>
  )
}
