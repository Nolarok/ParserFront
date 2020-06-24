import React, { useCallback, useEffect, useRef, useState } from 'react'
import addMonths from 'date-fns/addMonths'

import { TPeriod } from '@/types'
import { useRouter } from 'next/router'


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

export const useBindRouterQuery = (paramName: string) => {
  const router = useRouter()

  const currentValue = Array.isArray(router.query[paramName])
    ? router.query[paramName][0]
    : router.query[paramName] || ''

  // @ts-ignore
  const [value, setValue] = useState<string>(currentValue)

  const update = (value: string) => {
    console.log({value})
    setValue(value)
    router.replace(router.pathname, {query: {[paramName]: value}})
  }

  return {
    update,
    value,
    setValue,
  }
}
