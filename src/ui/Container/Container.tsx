import React from 'react'
import css from './Container.scss'
import cn from 'classnames'
import { block } from '@/helpers/bem'

export enum ContainerSize {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
}

type Props = {
  className?: string
  size?: ContainerSize
}

const b = block('container', css)

export const Container: React.FC<Props> = ({
  children,
  size = ContainerSize.MEDIUM,
  className,
}) => <div className={cn(b({ size }), className)}>{children}</div>
