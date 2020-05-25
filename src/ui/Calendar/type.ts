import { CardTheme } from './components/CalendarCard'

export type Header = {
  id: string
  title: string
  dayNumber: string | number
}

export type Row = {
  id: string
  title: string
}

export type FullDayEvents = {
  id: string
  title: string
}

export type Card = {
  id: string
  title: string
  minute: number
  duration: number
  theme: CardTheme
}
