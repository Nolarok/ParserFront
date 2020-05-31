import React from 'react'
import { JobTable } from '@/components/JobTable'
import Typography from '@material-ui/core/Typography'


const Page: React.FC = () => {
  return (
    <>
      <Typography variant="h6" gutterBottom component="div">
        Задачи
      </Typography>
      <JobTable/>
    </>
  )
}

export default Page
