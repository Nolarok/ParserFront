import React from 'react'
import css from './ContentWrapper.scss'
import { block } from '@/helpers/bem'
import { TextField, TextFieldTheme } from '@/ui/TextField'
import { Icon } from '@/ui/Icon'

const b = block('contentWrapper', css)

type Props = {
  title: string
  subtitle?: string
  searchLabel?: string
  onSearch?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const ContentWrapper: React.FC<Props> = props => {
  const { children, title, subtitle, onSearch, searchLabel } = props

  return (
    <div className={b()}>
      <div className={b('header')}>
        <h3 className={b('title')}>
          {title}
          {subtitle && <div className={b('subtitle')}>{subtitle}</div>}
        </h3>
        {searchLabel && (
          <div className={b('search')}>
            <TextField
              renderPostfix={<Icon className={b('icon')} icon="search" />}
              placeholder={searchLabel}
              onChange={onSearch}
              theme={TextFieldTheme.MATERIAL}
            />
          </div>
        )}
      </div>
      {children}
    </div>
  )
}
