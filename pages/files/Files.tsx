import React from 'react'
import { JobTable } from '@/components/JobTable'
import Typography from '@material-ui/core/Typography'
import { FileLoader } from '@/components/FileLoader'
import { FileTable } from '@/components/FileTable'
import { Box, Container } from '@material-ui/core'


const Page: React.FC = () => {
  return (
    <>
      <Typography variant="h6" gutterBottom component="div">
        Файлы
      </Typography>
      <Box m={2}>
        <FileLoader/>
      </Box>
      <FileTable/>
    </>
  )
}

export default Page
