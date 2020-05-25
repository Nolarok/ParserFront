import React, { ReactNode } from 'react'
import css from './Popover.scss'
import { block } from '@/helpers/bem'
import { ClickOutside } from '@/helpers/ClickOutside'

const b = block('popover', css)

export enum PopoverPlacement {
  TOP = 'top',
  Left = 'left',
  BOTTOM = 'bottom',
  RIGHT = 'right',
}

type Props = {
  content: ReactNode
  isOpen: boolean
  placement?: PopoverPlacement
  onClose: () => void
}

export const Popover: React.FC<Props> = props => {
  const { children, content, placement = PopoverPlacement.RIGHT, isOpen, onClose } = props

  return (
    <ClickOutside onClick={onClose} className={b({ isOpen })}>
      {children}
      <div
        className={b('content', {
          placement: placement,
          visible: isOpen,
        })}
      >
        {content}
      </div>
    </ClickOutside>
  )
}
