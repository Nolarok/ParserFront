import React from 'react'
import Button from '@material-ui/core/Button'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert, { AlertProps, Color } from '@material-ui/lab/Alert'
import { makeStyles, Theme } from '@material-ui/core/styles'

type Props = {
  isOpen: boolean,
  handleClose: (event?: React.SyntheticEvent, reason?: string) => void,
  data: {message: string}[]
  type: Color
}

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
    '& .MuiAlert-icon': {
      alignItems: 'center'
    },
    '& .MuiAlert-message li > span:not(:first-child)': {
      fontWeight: 300
    }
  },
}))

export const CustomSnackbar: React.FC<Props> = ({isOpen, handleClose, data, type}) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Snackbar open={isOpen} autoHideDuration={null} onClose={handleClose}>
        <Alert onClose={handleClose} severity={type} >
          <ul>
            {data.map((row) => {
              console.log(row.message)
              const [position, message] = row.message.split(':')
              return <li>
                <span>{position}:</span>
                <span>{message}</span>
              </li>
            })}
          </ul>
        </Alert>
      </Snackbar>
    </div>
  )
}
