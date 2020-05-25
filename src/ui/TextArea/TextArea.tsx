import React from 'react'
import ReactTextArea from 'react-textarea-autosize'
import cn from 'classnames'
import css from './TextArea.scss'
import { block } from '@/helpers/bem'

const b = block('textarea', css)

type Props = {
  placeholder?: string
  className?: string
  value?: string
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
  rows?: number
  minRows?: number
  maxRows?: number
  maxLength?: number
}

export const TextArea: React.FC<Props> = props => {
  const { placeholder, className, value, onChange, maxLength, maxRows, ...rest } = props

  return (
    <ReactTextArea
      {...rest}
      className={cn(b(), className)}
      onChange={onChange}
      value={value}
      placeholder={placeholder}
      maxLength={maxLength}
      maxRows={maxRows ? maxRows : 6}
    />
  )
}
