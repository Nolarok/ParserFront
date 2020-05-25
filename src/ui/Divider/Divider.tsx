import React from 'react'
import cn from 'classnames'
import { block } from '@/helpers/bem'
import css from './Divider.scss'

const b = block('container', css)

type Props = {
  title: string
  className?: string
}

export const Divider: React.FC<Props> = props => {
  const { title, className } = props

  return (
    <div className={cn(className, b())}>
      <div className={b('divider')} />
      <span className={b('title')}>{title}</span>
      <div className={b('divider')} />
    </div>
  )
}
