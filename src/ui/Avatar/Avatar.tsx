import React from 'react'
import cn from 'classnames'
import { block } from '@/helpers/bem'
import { Icon } from '@/ui/Icon'
import css from './Avatar.scss'
import { useObjectFitImagesPolyfill } from '@/helpers/hooks'

const b = block('avatar', css)

export enum AvatarSize {
  NORMAL = 'normal',
  LARGE = 'large',
  XLARGE = 'xLarge',
  HUGE = 'huge',
}

type Props = {
  image?: string
  size?: AvatarSize
  className?: string
  onClick?: () => void
  isSquared?: boolean
}

export const Avatar: React.FC<Props> = props => {
  const { image, className, size = AvatarSize.NORMAL, onClick, isSquared } = props

  const Tag = onClick ? 'button' : 'span'

  useObjectFitImagesPolyfill(image)

  return (
    <Tag
      type={onClick && 'button'}
      onClick={onClick}
      className={cn(b({ size, isSquared }), className)}
    >
      <span className={b('inner', { isSquared })}>
        {image ? (
          <img className={b('image', { isSquared })} src={image} alt="avatar" />
        ) : (
          <Icon icon="rebbit" className={b('icon')} />
        )}
      </span>
    </Tag>
  )
}
