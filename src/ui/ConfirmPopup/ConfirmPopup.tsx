import React from 'react'
import { block } from '@/helpers/bem'
import { Button, ButtonColor } from '@/ui/Button'
import css from './ConfirmPopup.scss'

const b = block('confirmPopup', css)

type Props = {
  isOpen: boolean
  message: string
  applyButtonText: string
  leaveButtonText: string
  onApply: () => void
  onLeave: () => void
}

export const ConfirmPopup: React.FC<Props> = props => {
  const { isOpen, message, applyButtonText, leaveButtonText, onApply, onLeave } = props

  return (
    <div className={b({ isOpen })}>
      <div className={b('overlay')} />
      <div className={b('inner')}>
        <div className={b('text')}>{message}</div>
        <div>
          <Button color={ButtonColor.WHITE} onClick={onApply} className={b('cancelOrder')}>
            {applyButtonText}
          </Button>
          <Button color={ButtonColor.GREEN} onClick={onLeave}>
            {leaveButtonText}
          </Button>
        </div>
      </div>
    </div>
  )
}
