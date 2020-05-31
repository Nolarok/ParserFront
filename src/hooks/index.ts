import React, { useCallback, useEffect, useRef, useState } from 'react'
import addMonths from 'date-fns/addMonths'

import { TPeriod } from '@/types'


export const useDatePeriod = () => {
  const [period, setPeriod] = useState<TPeriod>({
    from: addMonths(new Date(), -1),
    to: new Date()
  })

  const changePeriod = (period: TPeriod) => {
    let {from, to} = period

    if (from > to) from = to
    if (to < from) to = from

    setPeriod({from, to})
  }

  return {
    changePeriod,
    period
  }
}
