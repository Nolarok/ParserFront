import capitalize from 'lodash/capitalize'
import startOfWeek from 'date-fns/startOfWeek'
import addDays from 'date-fns/addDays'
import getDate from 'date-fns/getDate'
import localeRu from 'date-fns/locale/ru'
import format from 'date-fns/format'
import { Header, Row } from './type'

export const getAllDayWeek = (day: Date) => {
  const firstDayOfWeek = startOfWeek(day, { weekStartsOn: 1 })

  return [0, 1, 2, 3, 4, 5, 6].map(dayOfWeek => addDays(firstDayOfWeek, dayOfWeek))
}

export const getFirstDayOfWeek = () => startOfWeek(new Date(), { weekStartsOn: 1 })

export const dayToHeader = (day: Date): Header => ({
  id: day.toDateString(),
  dayNumber: getDate(day),
  title: format(day, 'iiiiii', { locale: localeRu }),
})

export const formatCalendarTitle = (day: Date) => {
  const formatData = format(day, 'MMMM, y', { locale: localeRu })

  return capitalize(formatData)
}

export const getAllHour = (): Row[] => {
  return [
    { id: '0', title: '' },
    { id: '1', title: '01:00' },
    { id: '2', title: '02:00' },
    { id: '3', title: '03:00' },
    { id: '4', title: '04:00' },
    { id: '5', title: '05:00' },
    { id: '6', title: '06:00' },
    { id: '7', title: '07:00' },
    { id: '8', title: '08:00' },
    { id: '9', title: '09:00' },
    { id: '10', title: '10:00' },
    { id: '11', title: '11:00' },
    { id: '12', title: '12:00' },
    { id: '13', title: '13:00' },
    { id: '14', title: '14:00' },
    { id: '15', title: '15:00' },
    { id: '16', title: '16:00' },
    { id: '17', title: '17:00' },
    { id: '18', title: '18:00' },
    { id: '19', title: '19:00' },
    { id: '20', title: '20:00' },
    { id: '21', title: '21:00' },
    { id: '22', title: '22:00' },
    { id: '23', title: '23:00' },
  ]
}
