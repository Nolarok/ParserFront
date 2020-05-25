import React, { useState, useEffect, useCallback } from 'react'
import cn from 'classnames'
import { getDaysInMonth } from 'date-fns'
import { block } from '@/helpers/bem'
import { Icon } from '@/ui/Icon'
import css from './Datepicker.scss'

export enum DatepickerThemes {
  SIMPLE = 'simple',
  AVAILABILITY = 'availability',
}

const b = block('datepicker', css)

type Props = {
  theme: DatepickerThemes
  available?: Date[]
  availablePartially?: Date[]
  notAvailable?: Date[]
  className?: string
  onSelect?: (selectedDate: Date) => void
}

export const Datepicker: React.FC<Props> = props => {
  const { available, availablePartially, notAvailable, className, onSelect, theme } = props

  const [selectedDate, setSelectedDate] = useState<Date>()
  const [month, setMonth] = useState<number>(1)
  const [year, setYear] = useState<number>(2000)

  const isAvailabilityTheme = theme === DatepickerThemes.AVAILABILITY

  useEffect(() => {
    const currentDate = new Date()

    setMonth(currentDate.getMonth())
    setYear(currentDate.getFullYear())
  }, [available, availablePartially, notAvailable])

  const handleMonthClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      let newMonth = month + parseInt(e.currentTarget.value)

      if (newMonth > 11) {
        newMonth = 0
        setYear(year + 1)
      } else if (newMonth < 0) {
        newMonth = 11
        setYear(year - 1)
      }

      setMonth(newMonth)
    },
    [month, year, setMonth, setYear]
  )

  const handleDateClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      const date = new Date(year, month, parseInt(e.currentTarget.value))

      setSelectedDate(date)
      onSelect && onSelect(date)
    },
    [setSelectedDate, year, month, onSelect]
  )

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(new Date(year, month))
    const weekDay = new Date(year, month, 1).getDay()
    const delta = weekDay === 0 ? 7 : weekDay
    const items = []

    for (let i = 1; i < delta; i++) {
      items.push(
        <span
          key={`empty_${i}`}
          className={b('emptyDay', {
            simple: !isAvailabilityTheme,
          })}
        ></span>
      )
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i)

      if (theme === DatepickerThemes.AVAILABILITY) {
        const isAvailable = available && available.map(Number).indexOf(+date) !== -1
        const isAvailablePartially =
          availablePartially && availablePartially.map(Number).indexOf(+date) !== -1
        const isNotAvailable = notAvailable && notAvailable.map(Number).indexOf(+date) !== -1

        items.push(
          <button
            key={date.toString()}
            value={i}
            className={b('day', {
              green: isAvailable,
              yellow: isAvailablePartially,
              gray: isNotAvailable,
            })}
            onClick={handleDateClick}
          >
            {i}
          </button>
        )
      } else {
        const isSelected = selectedDate && selectedDate.getTime() === date.getTime()

        items.push(
          <button
            key={date.toString()}
            value={i}
            className={b('day', { simple: true, selected: isSelected })}
            onClick={handleDateClick}
          >
            {i}
          </button>
        )
      }
    }

    return items
  }

  const monthName = new Date(year, month).toLocaleString('ru-RU', { month: 'long' })

  return (
    <div className={cn(className, b({ availability: isAvailabilityTheme }))}>
      <div className={b('month', { availability: isAvailabilityTheme })}>
        <button value="-1" className={b('arrowButton')} onClick={handleMonthClick}>
          <Icon
            icon="chevrone"
            className={b('arrow', {
              availability: isAvailabilityTheme,
              left: true,
            })}
          />
        </button>
        <span>{`${monthName} ${year}`}</span>
        <button value="1" className={b('arrowButton')} onClick={handleMonthClick}>
          <Icon
            icon="chevrone"
            className={b('arrow', {
              availability: isAvailabilityTheme,
            })}
          />
        </button>
      </div>
      {!isAvailabilityTheme && (
        <div className={b('weekDays')}>
          <span>ПН</span>
          <span>ВТ</span>
          <span>СР</span>
          <span>ЧТ</span>
          <span>ПТ</span>
          <span>СБ</span>
          <span>ВС</span>
        </div>
      )}
      <div className={b('calendar', { availability: isAvailabilityTheme })}>{renderCalendar()}</div>
      {isAvailabilityTheme && (
        <div className={b('statuses')}>
          <span className={b('status')}>
            <span className={b('rectangle', { color: 'green' })} /> - доступно
          </span>
          <span className={b('status')}>
            <span className={b('rectangle', { color: 'yellow' })} /> - частично доступно
          </span>
        </div>
      )}
    </div>
  )
}
