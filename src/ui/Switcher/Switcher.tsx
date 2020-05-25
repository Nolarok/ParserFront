import React from 'react'
import css from './Switcher.scss'
import { Icon } from '@/ui/Icon'
import { block } from '@/helpers/bem'

const b = block('switcher', css)

type Props = {
  name?: string
  checked?: boolean
  onChange?: (checked: boolean) => void
}

export const Switcher: React.FC<Props> = props => {
  const { children, name, checked, onChange = () => {} } = props

  return (
    <label className={b()}>
      <input
        type="checkbox"
        checked={checked}
        name={name}
        onChange={() => onChange(!checked)}
        className={b('input')}
      />
      <span className={b('space')}>
        <span className={b('point')}>
          <Icon icon="check" className={b('check')} />
          <Icon icon="close" className={b('close')} />
        </span>
      </span>
      {children && <span className={b('text')}>{children}</span>}
    </label>
  )
}
