import React from 'react'
import { JobTable } from '@/components/JobTable'
import Typography from '@material-ui/core/Typography'
import { DatePeriod } from '@/components/DatePeriod'
import { useDatePeriod } from '@/hooks'

const Page: React.FC = () => {
  const {period, changePeriod} = useDatePeriod()

  return (
    <>
      <Typography variant="h6" gutterBottom component="div">
        Задачи
      </Typography>
      <DatePeriod period={period} handleChange={changePeriod} />
      <JobTable period={period}/>
    </>
  )
}

export default Page
