import React from 'react'
import css from './Icon.scss'
import cn from 'classnames'
import { block } from '@/helpers/bem'

const b = block('icon', css)

type Props = {
  icon: string
  width?: number
  rotate?: number
  className?: string
}

export const Icon: React.FC<Props> = props => {
  const { className, icon, width, rotate } = props

  const style = {
    ...(width && { width: `${width}px` }),
    ...(rotate && { transform: `rotate(${rotate}deg)` }),
  }

  return (
    <div
      style={style}
      className={cn(b(), className)}
      dangerouslySetInnerHTML={{
        __html: require(`!raw-loader!./icons/${icon}.svg`).default,
      }}
    />
  )
}
