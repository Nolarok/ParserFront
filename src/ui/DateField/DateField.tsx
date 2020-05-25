import React, { useState } from 'react'
import { block } from '@/helpers/bem'
import { DropdownPanel } from '@/ui/DropdownPanel'
import { TextField, TextFieldTheme } from '@/ui/TextField'
import { Icon } from '@/ui/Icon'
import { Datepicker, DatepickerThemes } from '@/ui/Datepicker'
import css from './DateField.scss'
import { format } from 'date-fns'

const b = block('dateField', css)

type Props = {
  value?: Date
  error?: boolean
  placeholder?: string
  onChange: (value: Date) => void
}

export const DateField: React.FC<Props> = props => {
  const { value, placeholder, error, onChange } = props
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={b()}>
      <DropdownPanel
        open={isOpen}
        block
        onClose={() => setIsOpen(false)}
        button={
          <div onClick={() => setIsOpen(!isOpen)}>
            <TextField
              disabled
              error={error}
              theme={TextFieldTheme.SMALL}
              value={value && format(value, 'dd.MM.YYY')}
              placeholder={placeholder}
              renderPostfix={<Icon icon="calendar" className={b('icon')} />}
            />
          </div>
        }
      >
        <Datepicker theme={DatepickerThemes.SIMPLE} onSelect={onChange} />
      </DropdownPanel>
    </div>
  )
}
