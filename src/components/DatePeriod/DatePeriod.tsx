import React from 'react'

import 'date-fns'
import DateFnsUtils from '@date-io/date-fns'
import Grid from '@material-ui/core/Grid'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'


import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers'
import { TPeriod } from '@/types'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    picker: {
      margin: 10
    }
  }),
)

type Props = {
  period: TPeriod,
  handleChange: (period: TPeriod) => void
}

export const DatePeriod: React.FC<Props> = ({period, handleChange}) => {
  const classes = useStyles()

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="flex-start">
        <KeyboardDatePicker
          className={classes.picker}
          disableToolbar
          variant="inline"
          format="dd/MM/yyyy"
          margin="normal"
          id="date-picker-from"
          label="От:"
          value={period.from}
          onChange={(date) => {handleChange({...period, ...{from: date as Date}})}}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />

        <KeyboardDatePicker
          className={classes.picker}
          disableToolbar
          variant="inline"
          format="dd/MM/yyyy"
          margin="normal"
          id="date-picker-to"
          label="До:"
          value={period.to}
          onChange={(date) => {handleChange({...period, ...{to: date as Date}})}}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />

      </Grid>
    </MuiPickersUtilsProvider>
  )
}
