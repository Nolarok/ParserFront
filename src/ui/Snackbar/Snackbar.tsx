import React, { useEffect } from 'react'
import css from './Snackbar.scss'
import { block } from '@/helpers/bem'
import cn from 'classnames'
import { ButtonLink, ButtonLinkColor, ButtonLinkSize } from '@/ui/ButtonLink'
import _ from 'lodash'

const b = block('Snackbar', css)

export enum SnackbarTheme {
  NOTIFICATION = 'notification',
  ERROR = 'error',
  SUCCESS = 'success',
}

export enum SnackbarPosition {
  DEFAULT = 'default',
  ABSOLUTE = 'absolute',
  FIXED = 'fixed',
  RELATIVE = 'relative',
}

type Props = {
  theme?: SnackbarTheme
  messages: { [key: string]: string[] }
  isOpen: boolean
  handlerClick: () => void
  position?: SnackbarPosition
  isFading?: boolean
}

export const Snackbar: React.FC<Props> = ({
  messages,
  handlerClick,
  isOpen,
  theme = SnackbarTheme.NOTIFICATION,
  position = SnackbarPosition.FIXED,
  isFading = false,
}) => {

  useEffect(() => {
    if (isFading && isOpen) {
      setTimeout(() => {
        handlerClick()
        isOpen = false
      }, 3000)
    }
  });

  const renderMessages: any = () => {
    return _.map(messages, (message: string[], key: string) => {
      return (
        <li key={key}>
          {key && <span className={b('message-key')}>{key}:</span>}
          <span className={b('message-content')}>{message.join('. ')}</span>
        </li>
      )
    })
  }

  return (
    <div className={cn(b({ position }), !isOpen && b('hidden'))}>
      <div className={cn(b('content', { theme }))}>
        <div className={b('error-message')}>
          <ul>{renderMessages()}</ul>
        </div>
        {!isFading && (
          <ButtonLink
            className={b('btn-close')}
            size={ButtonLinkSize.SMALL}
            color={ButtonLinkColor.BLUE_DARK}
            onClick={handlerClick}
          >
            {' '}
            🗙
          </ButtonLink>
        )}
      </div>
    </div>
  )
}
