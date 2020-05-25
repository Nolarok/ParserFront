import React, { useEffect, useState } from 'react'
import { block } from '@/helpers/bem'
import { timeZeroFormat } from '@/helpers/time'
import css from './Countdown.scss'

const b = block('countdown', css)

type Props = {
  targetDate: Date
}

export const Countdown: React.FC<Props> = props => {
  const { targetDate } = props
  const [difference, setDifference] = useState<Date>(new Date(targetDate.getTime() - Date.now()))

  useEffect(() => {
    const timer = setInterval(() => {
      setDifference(new Date(targetDate.getTime() - Date.now()))
    }, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  return (
    <div className={b()}>
      <div className={b('item')}>
        <div className={b('time')}>{timeZeroFormat(difference.getHours())}</div>
        <div className={b('unit')}>час</div>
      </div>
      <div className={b('item')}>
        <div className={b('time')}>{timeZeroFormat(difference.getMinutes())}</div>
        <div className={b('unit')}>мин</div>
      </div>
      <div className={b('item')}>
        <div className={b('time')}>{timeZeroFormat(difference.getSeconds())}</div>
        <div className={b('unit')}>сек</div>
      </div>
    </div>
  )
}
