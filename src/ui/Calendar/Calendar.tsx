import React, { useCallback, useMemo, useState } from 'react'
import addDays from 'date-fns/addDays'
import { block } from '@/helpers/bem'
import { IDictionary } from '@/types'
import { Icon } from '@/ui/Icon'
import {
  dayToHeader,
  formatCalendarTitle,
  getAllDayWeek,
  getAllHour,
  getFirstDayOfWeek,
} from './utils'
import { Card, FullDayEvents, Header, Row } from './type'
import { CalendarGrid } from './components/CalendarGrid'
import { CalendarCard } from './components/CalendarCard'
import { CalendarControls } from './components/CalendarControls'
import css from './Calendar.scss'

const b = block('container', css)

type Props = {
  getCardsByCell: (rowId: string, headerId: string) => Card[]
}

export const Calendar: React.FC<Props> = props => {
  const { getCardsByCell } = props
  const [firstDayOfWeek, setToday] = useState<Date>(getFirstDayOfWeek())
  const calendarTitle = useMemo(() => formatCalendarTitle(firstDayOfWeek), [firstDayOfWeek])
  const allDayWeek = useMemo(() => getAllDayWeek(firstDayOfWeek), [firstDayOfWeek])
  const headers: Header[] = useMemo(() => allDayWeek.map(dayToHeader), [allDayWeek])
  const rows: Row[] = useMemo(getAllHour, [])

  const handleNext = useCallback(() => {
    const nextDay = addDays(firstDayOfWeek, 7)

    setToday(nextDay)
  }, [firstDayOfWeek])

  const handleBack = useCallback(() => {
    const nextDay = addDays(firstDayOfWeek, -7)

    setToday(nextDay)
  }, [firstDayOfWeek])

  const handleToday = useCallback(() => {
    setToday(getFirstDayOfWeek())
  }, [])

  const fullDayEvents: IDictionary<FullDayEvents[]> = {
    'Thu Oct 24 2019': [{ id: '1', title: 'Выходной' }],
  }

  const renderContent = (rowId: string, headerId: string) => {
    const cardsOnDay: Card[] = getCardsByCell(rowId, headerId)

    return cardsOnDay.map((card, index) => {
      const top = card.minute * (100 / 60)
      const height = card.duration * (58 / 60)
      const zIndex = cardsOnDay.length - index

      return (
        <CalendarCard
          key={card.id}
          style={{ zIndex }}
          title={card.title}
          top={top}
          height={height}
          theme={card.theme}
          renderIcon={className => <Icon className={className} icon="type-event-show" width={17} />}
          text={
            <>
              Москва, м.
              <br />
              Алексеевская. пр.
              <br />
              Мира, 102
            </>
          }
        />
      )
    })
  }

  const renderHeader = (header: Header) => {
    const fullDayEventsOnDay = fullDayEvents[header.id] || []

    return (
      <div key={header.id} className={b('headerCell')}>
        <div className={b('day')}>
          {header.title}
          <div className={b('dayNumber')}>{header.dayNumber}</div>
        </div>
        {fullDayEventsOnDay.map(fullDayEvent => (
          <div key={fullDayEvent.id} className={b('fullDayEvent')}>
            {fullDayEvent.title}
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className={b()}>
      <CalendarControls
        className={b('calendarControls')}
        onNext={handleNext}
        onBack={handleBack}
        onToday={handleToday}
        title={calendarTitle}
        onAddEvent={() => {}}
        onChangeDisplayType={() => {}}
      />
      <CalendarGrid
        headers={headers}
        rows={rows}
        renderContent={renderContent}
        renderHeader={renderHeader}
      />
    </div>
  )
}
