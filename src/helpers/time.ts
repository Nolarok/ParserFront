import { IOption } from '@/types'

export const timeZeroFormat = (time: number) => (time < 10 ? `0${time}` : `${time}`)

export const formatTime = (seconds: number) => {
  const sec = seconds % 60
  const min = Math.floor(seconds / 60) % 60
  const hours = Math.floor(seconds / 3600) % 60

  if (hours) {
    return `${hours}:${timeZeroFormat(min)}:${timeZeroFormat(sec)}`
  }
  if (min) {
    return `${timeZeroFormat(min)}:${timeZeroFormat(sec)}`
  }
  return timeZeroFormat(sec)
}

export const getTimesValues = (timeStart?: IOption, timeEnd?: IOption) => {
  let start = 0
  let maxHours = 23

  if (timeStart) {
    const timeStartValue = parseInt(timeStart.value, 10)

    if (timeStartValue >= 0) {
      start = timeStartValue + 1
      maxHours = 24
    }
  }
  if (timeEnd) {
    const timeEndValue = parseInt(timeEnd.value, 10)

    if (timeEndValue > 1) {
      maxHours = timeEndValue - 1
    }
  }
  const arrOptions: IOption[] = []

  for (let i = start; i <= maxHours; i++) {
    arrOptions.push({
      label: `${i}:00`,
      value: `${i}`,
    })
  }
  return arrOptions
}
