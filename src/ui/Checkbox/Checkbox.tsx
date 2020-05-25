import React from 'react'
import { Icon } from '@/ui/Icon'
import { block } from '@/helpers/bem'
import css from './Checkbox.scss'

const b = block('checkbox', css)

export enum CheckboxTheme {
  DEFAULT = 'default',
  CIRCLE = 'circle',
}

type Props = {
  checked?: boolean
  disabled?: boolean
  name?: string
  error?: boolean
  value?: string
  theme?: CheckboxTheme
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const Checkbox: React.FC<Props> = props => {
  const {
    value,
    checked,
    onChange,
    children,
    theme = CheckboxTheme.DEFAULT,
    disabled,
    error,
    ...rest
  } = props

  return (
    <label className={b({ error })}>
      <input
        {...rest}
        className={b('input')}
        value={value}
        disabled={disabled}
        checked={checked}
        onChange={onChange}
        type="checkbox"
      />
      <span
        className={b('space', {
          theme: theme,
        })}
      >
        <Icon icon="check" className={b('check')} />
      </span>
      {children && <span className={b('text')}>{children}</span>}
    </label>
  )
}
