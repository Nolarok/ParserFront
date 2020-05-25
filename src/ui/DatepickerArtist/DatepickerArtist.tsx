import React, { useState, useCallback } from 'react'
import cn from 'classnames'
import { block } from '@/helpers/bem'
import { Button, ButtonColor } from '@/ui/Button'
import { Datepicker, DatepickerThemes } from '@/ui/Datepicker'
import css from './DatepickerArtist.scss'

const b = block('datepickerArtist', css)

type Props = {
  available?: Date[]
  availablePartially?: Date[]
  notAvailable?: Date[]
  className?: string
  onSubmit?: (selectedDate: Date) => void
}

export const DatepickerArtist: React.FC<Props> = props => {
  const { className, available, availablePartially, notAvailable, onSubmit } = props

  const [selectedDate, setSelectedDate] = useState<Date>()

  const handleSubmit = useCallback(() => {
    if (selectedDate && onSubmit) {
      onSubmit(selectedDate)
    }
  }, [onSubmit, selectedDate])

  const handleDateSelect = useCallback(
    (date: Date) => {
      setSelectedDate(date)
    },
    [setSelectedDate]
  )

  return (
    <div className={cn(className, b())}>
      <div className={b('header')}>Доступные даты</div>
      <Datepicker
        theme={DatepickerThemes.AVAILABILITY}
        onSelect={handleDateSelect}
        available={available}
        availablePartially={availablePartially}
        notAvailable={notAvailable}
      />
      <Button type="submit" color={ButtonColor.RED} onClick={handleSubmit} className={b('submit')}>
        Заказать услугу
      </Button>
    </div>
  )
}
