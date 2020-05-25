import React from 'react'
import cn from 'classnames'
import { block } from '@/helpers/bem'
import css from './ImageSection.scss'

const b = block('container', css)

type Props = {
  label: string | React.ReactNode
  src: string
  srcSet?: string
  className?: string
  textClassName?: string
}

export const ImageSection: React.FC<Props> = props => {
  const { label, src, className, textClassName, srcSet } = props

  return (
    <div className={cn(b(), className)}>
      <img alt="banner" className={b('image')} src={src} srcSet={srcSet} />
      <span className={cn(b('text'), b(textClassName))}>{label}</span>
    </div>
  )
}
