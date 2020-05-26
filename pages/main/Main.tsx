import React from 'react'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import ListItem, { ListItemProps } from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import DescriptionIcon from '@material-ui/icons/Description'
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted'
import { FileTable } from '@/components/FileTable/FileTable'
import { Button } from '@/ui/Button'
import { useDispatch } from 'react-redux'
import { fetchJobs } from '@/store/job/actions'
import { useRouter } from 'next/router'


const Page: React.FC = () => {
  const dispatch = useDispatch()
  const router = useRouter()

  return (
    <Grid container spacing={3}>
      <Grid item xs={2}>
        <List component="nav" aria-label="main mailbox folders">
          <ListItem button onClick={() => {
            router.push('/')
          }}>
            <ListItemIcon >
              <DescriptionIcon/>
            </ListItemIcon>
            <ListItemText primary="Файлы"/>
          </ListItem>
          <ListItem button onClick={() => {
            router.push('/main')
          }}>
            <ListItemIcon >
              <FormatListBulletedIcon/>
            </ListItemIcon>
            <ListItemText primary="Задачи"/>
          </ListItem>
        </List>
      </Grid>
      <Grid item xs={10}>
        <Paper>
          <h3>Задачи</h3>
          <FileTable/>
        </Paper>
      </Grid>
    </Grid>
  )
}

export default Page
