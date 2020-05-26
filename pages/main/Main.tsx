import React from 'react'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import ListItem, { ListItemProps } from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import InboxIcon from '@material-ui/icons/Inbox'
import DraftsIcon from '@material-ui/icons/Drafts'
import { FileTable } from '@/components/FileTable/FileTable'
import { Button } from '@/ui/Button'
import { useDispatch } from 'react-redux'
import { fetchJobs } from '@/store/job/actions'


const Page: React.FC = () => {
  const dispatch = useDispatch()

  return (
    <Grid container spacing={3}>
      <Grid item xs={2}>
        <List component="nav" aria-label="main mailbox folders">
          <ListItem button>
            <ListItemIcon>
              <InboxIcon/>
            </ListItemIcon>
            <ListItemText primary="Inbox"/>
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <DraftsIcon/>
            </ListItemIcon>
            <ListItemText primary="Drafts"/>
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
