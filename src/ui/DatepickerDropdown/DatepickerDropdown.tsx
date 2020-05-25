import React from 'react'
import { DropdownPanel } from '@/ui/DropdownPanel'
import { Datepicker, DatepickerThemes } from '@/ui/Datepicker/Datepicker'
import { block } from '@/helpers/bem'
import { Button, ButtonColor, ButtonSize, ButtonTheme } from '@/ui/Button'
import css from './DatepickerDropdown.scss'
import { format } from 'date-fns'

const b = block('datepickerDropdown', css)

type Props = {
  title?: string
  className?: string
  date?: Date
  dateFormat?: string
  onSelect?: (date: Date) => void
  onClose: () => void
}

export const DatepickerDropdown: React.FC<Props> = props => {
  const { onSelect, className, title, date, dateFormat = 'dd.MM.yyyy', onClose } = props
  const [open, setOpen] = React.useState(false)

  const handleClose = React.useCallback(() => {
    setOpen(false)
    onClose()
  }, [onClose, setOpen])

  const handleToggle = React.useCallback(() => {
    if (open) {
      onClose()
    }
    setOpen(!open)
  }, [onClose, setOpen, open])

  return (
    <DropdownPanel
      className={b()}
      open={open}
      onClose={handleClose}
      button={
        <Button
          className={className}
          theme={ButtonTheme.THIN}
          onClick={handleToggle}
          color={!open && !date ? ButtonColor.WHITE : ButtonColor.BLUE}
          size={ButtonSize.SMALL}
        >
          {date ? format(date, dateFormat) : title}
        </Button>
      }
    >
      <Datepicker theme={DatepickerThemes.SIMPLE} onSelect={onSelect} />
    </DropdownPanel>
  )
}
