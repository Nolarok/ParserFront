import React, { useCallback } from 'react'
import { TextField, TextFieldProps } from '@/ui/TextField'
import { Icon } from '@/ui/Icon'
import css from './SearchField.scss'
import { block } from '@/helpers/bem'

const b = block('search', css)

type Props = {
  onSearch: () => void
} & TextFieldProps

export const SearchField: React.FC<Props> = props => {
  const { onSearch } = props

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        onSearch()
      }
    },
    [onSearch]
  )

  return (
    <TextField
      onKeyDown={handleKeyDown}
      renderPostfix={<Icon className={b('icon')} icon="search" />}
      classInput={b('input')}
      classContainer={b()}
      {...props}
    />
  )
}
