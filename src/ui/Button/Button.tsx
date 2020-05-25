import React from 'react'
import cn from 'classnames'
import css from './Button.scss'
import { block } from '@/helpers/bem'
import Link from 'next/link'

const b = block('button', css)

export enum ButtonColor {
  RED = 'red',
  WHITE = 'white',
  GREEN = 'green',
  BLUE = 'blue',
  BLUE_DARK = 'blueDark',
  LIGHT_BLUE = 'lightBlue',
  WHITE_WITH_RED = 'whiteWithRed',
  WHITE_WITH_RED_HOVER = 'whiteWithRedHover',
}

export enum ButtonTheme {
  DEFAULT = 'default',
  CIRCLE = 'circle',
  THIN = 'thin',
}

export enum ButtonSize {
  NORMAL = 'normal',
  LARGE = 'large',
  SMALL = 'small',
  LITTLE = 'little',
}

type Props = {
  onClick?: () => void
  pending?: boolean
  type?: 'button' | 'submit'
  color?: ButtonColor
  theme?: ButtonTheme
  size?: ButtonSize
  href?: string
  block?: boolean
  disabled?: boolean
  className?: string
}

export const Button: React.FC<Props> = props => {
  const {
    onClick,
    type = 'button',
    color = ButtonColor.WHITE,
    size = ButtonSize.NORMAL,
    theme = ButtonTheme.DEFAULT,
    pending,
    children,
    disabled,
    block,
    href,
    className,
  } = props

  const defaultClassName = b({
    color,
    theme,
    size,
    block,
  })

  if (href) {
    return (
      <Link href={href}>
        <a className={cn(defaultClassName, className)} onClick={onClick}>
          <span className={b('inner')}>{children}</span>
        </a>
      </Link>
    )
  }

  return (
    <button
      className={cn(defaultClassName, className)}
      disabled={disabled || pending}
      type={type}
      onClick={onClick}
    >
      <div
        className={cn({
          [b('loader')]: true,
          [b('loader_visible')]: pending,
        })}
      />
      <span className={b('inner')}>{children}</span>
    </button>
  )
}
