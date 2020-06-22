import React, { useEffect } from 'react'

import { DatePeriod } from '@/components/DatePeriod'

import Typography from '@material-ui/core/Typography'
import { FileLoader } from '@/components/FileLoader'
import { FileTable } from '@/components/FileTable'
import { Box, Chip, Container, Avatar } from '@material-ui/core'
import { useDatePeriod } from '@/hooks'

const Page: React.FC = () => {
  const {period, changePeriod} = useDatePeriod()

  return (
    <>
      <Typography variant="h6" gutterBottom component="div">
        Файлы
      </Typography>
      <Box m={2}>
        <FileLoader/>
      </Box>
      <DatePeriod period={period} handleChange={changePeriod} />
      <FileTable
        period={period}
      />
    </>
  )
}

export default Page
