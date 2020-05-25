import React from 'react'
import css from './FormErrors.scss'
import cn from 'classnames'

import _ from 'lodash'

import { block } from '@/helpers/bem'
import { Icon } from '@/ui/Icon'

const b = block('formErrors', css)

export enum FormErrorsTheme {
  BLOCK = 'block',
  ROW = 'row',
}

type Props = {
  errors: string[]
  isOpen: boolean
  onClose: () => void
  theme?: FormErrorsTheme
  className?: string
}

export const FormErrors: React.FC<Props> = ({
  errors,
  onClose,
  isOpen,
  theme = FormErrorsTheme.BLOCK,
  className,
}) => {
  const renderErrors = (): React.ReactElement[] => {
    return errors.map((error, index) => (
      <li key={index} className={b('error', { theme })}>
        {error}
      </li>
    ))
  }

  return (
    <div
      className={cn(
        {
          [b('isOpen')]: isOpen && !_.isEmpty(errors),
          [b({ theme })]: true,
        },
        className
      )}
    >
      <ul className={b('error-list')}>{renderErrors()}</ul>
      <button type="button" className={b('closeBtn', { theme })} onClick={onClose}>
        <Icon icon="close" className={b('close')} />
      </button>
    </div>
  )
}
