import React from 'react'
import cn from 'classnames'
import { block } from '@/helpers/bem'
import css from '@/ui/MessageWrapper/MessageWrapper.scss'

const b = block('messageWrapper', css)

type Props = {
  className?: string
}

export const MessageWrapper: React.FC<Props> = props => {
  const { className, children } = props

  return (
    <div className={b()}>
      <div className={cn(className, b('text'))}>{children}</div>
    </div>
  )
}
