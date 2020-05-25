import React from 'react'
import cn from 'classnames'
import css from './LabelCheckbox.scss'
import { block } from '@/helpers/bem'
import { Icon } from '@/ui/Icon'

const b = block('labelCheckbox', css)

type Props = {
  title: string
  onClick: () => void
  checked?: boolean
  className?: string
}

export const LabelCheckbox: React.FC<Props> = props => {
  const { title, onClick, checked = false, className } = props

  return (
    <button className={cn(className, b({ checked }))} onClick={onClick}>
      <span className={b('title')}>
        {checked && (
          <span className={b('checkbox')}>
            <Icon icon="check" />
          </span>
        )}
        {title}
      </span>
    </button>
  )
}
