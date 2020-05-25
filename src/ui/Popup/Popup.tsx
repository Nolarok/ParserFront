import React from 'react'
import cn from 'classnames'
import css from './Popup.scss'
import { Icon } from '@/ui/Icon'
import { block } from '@/helpers/bem'

const b = block('popup', css)

type Props = {
  title?: string
  isOpen?: boolean
  width?: number
  className?: string
  classNameTitle?: string
  onClose?: () => void
  onReset?: () => void
}

export const Popup: React.FC<Props> = props => {
  const { children, title, onClose, onReset, isOpen, width, className, classNameTitle } = props

  React.useEffect(() => {
    document.body.style.overflowY = isOpen ? 'hidden' : 'auto'
    !isOpen && onReset && onReset()
  }, [isOpen])

  return (
    <div className={b({ isOpen })}>
      <div className={b('wrapper')}>
        <div style={{ width: width ? `${width}px` : '' }} className={cn(className, b('card'))}>
          {onClose && (
            <button type="button" className={b('closeBtn')} onClick={onClose}>
              <Icon icon="close" className={b('close')} />
            </button>
          )}
          {title && <h1 className={cn(classNameTitle, b('title'))}>{title}</h1>}
          {children}
        </div>
      </div>
    </div>
  )
}
