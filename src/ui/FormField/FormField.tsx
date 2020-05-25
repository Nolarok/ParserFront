import React from 'react'
import cn from 'classnames'
import css from './FormField.scss'
import { block } from '@/helpers/bem'

const b = block('formField', css)

export enum FormFieldTheme {
  DEFAULT = 'default',
  LONG = 'long',
  SHORT = 'short',
  SHORT_TEXTAREA = 'shortTextarea',
  TOP_LABEL = 'topLabel',
}

type Props = {
  theme?: FormFieldTheme
  className?: string
  caption?: string
  classNameCaption?: string
  classNameInputContainer?: string
}

export const FormField: React.FC<Props> = props => {
  const {
    className,
    caption,
    children,
    theme = FormFieldTheme.DEFAULT,
    classNameCaption,
    classNameInputContainer,
  } = props

  return (
    <label className={cn(b({ theme }), className)}>
      {caption && <span className={cn(b('caption'), classNameCaption)}>{caption}</span>}
      {children && <span className={cn(b('container'), classNameInputContainer)}>{children}</span>}
    </label>
  )
}
