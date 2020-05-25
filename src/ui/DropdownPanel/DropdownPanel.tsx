import React from 'react'
import cn from 'classnames'
import { block } from '@/helpers/bem'
import { ClickOutside } from '@/helpers/ClickOutside'
import css from './DropdownPanel.scss'

const b = block('dropdownPanel', css)

type Props = {
  open: boolean
  block?: boolean
  button: React.ReactNode
  className?: string
  onClose: () => void
}

export const DropdownPanel: React.FC<Props> = props => {
  const { children, button, className, open, onClose } = props

  const handleClose = React.useCallback(() => {
    if (open) {
      onClose()
    }
  }, [open, onClose])

  return (
    <ClickOutside onClick={handleClose} className={b({ block })}>
      {button}
      <div className={cn(className, b('content', { open }))}>{children}</div>
    </ClickOutside>
  )
}
