import React from 'react'
import cn from 'classnames'
import { block } from '@/helpers/bem'
import { Counter } from '@/ui/Counter'
import css from './ButtonLink.scss'
import Link from 'next/link'

const b = block('link', css)

export enum ButtonLinkColor {
  GRAY = 'gray',
  GRAY_DARK = 'grayDark',
  BLUE = 'blue',
  BLUE_DARK = 'blueDark',
  BLUE_LIGHT = 'blueLight',
  RED = 'red',
}

export enum ButtonLinkSize {
  EXTRA_SMALL = 'extraSmall',
  SMALL = 'small',
  NORMAL = 'normal',
  LARGE = 'large',
}

export enum ButtonLinkIconPosition {
  LEFT = 'left',
  RIGHT = 'right',
}

type Props = {
  size?: ButtonLinkSize
  color?: ButtonLinkColor
  iconPosition?: ButtonLinkIconPosition
  icon?: React.ReactElement
  counter?: number
  href?: string
  onClick?: (event: React.MouseEvent) => void
  dashed?: boolean
  className?: string
  id?: string
  disabled?: boolean
}

export const ButtonLink: React.FC<Props> = props => {
  const {
    children,
    color = ButtonLinkColor.GRAY,
    size = ButtonLinkSize.NORMAL,
    icon,
    iconPosition = ButtonLinkIconPosition.LEFT,
    onClick,
    className,
    dashed,
    counter,
    href,
    id,
    disabled,
  } = props

  const content = (
    <>
      {icon && iconPosition === ButtonLinkIconPosition.LEFT && (
        <span className={b('iconLeft')}>{icon}</span>
      )}
      <span className={cn(b('inner', { dashed }))}>{children}</span>
      {icon && iconPosition === ButtonLinkIconPosition.RIGHT && (
        <span className={b('iconRight')}>{icon}</span>
      )}
      {counter ? (
        <Counter counterClass={b('counterInner')} className={b('counter')} count={counter} />
      ) : null}
    </>
  )

  if (href) {
    return (
      <Link href={href}>
        <a onClick={onClick} className={cn(b({ size, color }), className)}>
          {content}
        </a>
      </Link>
    )
  }

  return (
    <button
      id={id}
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(b({ size, color }), className)}
    >
      {content}
    </button>
  )
}
