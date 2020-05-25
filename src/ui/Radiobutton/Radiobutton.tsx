import React from 'react'
import css from './Radiobutton.scss'
import cn from 'classnames'
import { Icon } from '@/ui/Icon'
import { block } from '@/helpers/bem'

const b = block('radiobutton', css)

export enum RadiobuttonTheme {
  CHECK = 'check',
  DEFAULT = 'default',
}

type Props = {
  checked?: boolean
  disabled?: boolean
  name?: string
  value?: string
  className?: string
  theme?: RadiobuttonTheme
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const Radiobutton: React.FC<Props> = props => {
  const {
    className,
    value,
    checked,
    onChange,
    children,
    theme = RadiobuttonTheme.DEFAULT,
    disabled,
  } = props

  return (
    <label className={cn(b({ theme }), className)}>
      <input
        className={b('input')}
        value={value}
        disabled={disabled}
        checked={checked}
        onChange={onChange}
        type="radio"
      />
      <span className={b('space')}>
        <Icon icon="check" className={b('check')} />
      </span>
      {children && <span className={b('text')}>{children}</span>}
    </label>
  )
}
