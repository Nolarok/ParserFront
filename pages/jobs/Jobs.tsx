import React, { MutableRefObject, useRef } from 'react'
import { JobTable } from '@/components/JobTable'
import Typography from '@material-ui/core/Typography'
import { DatePeriod } from '@/components/DatePeriod'
import { useBindRouterQuery, useDatePeriod } from '@/hooks'
import TextField from '@material-ui/core/TextField/TextField'

import SearchIcon from '@material-ui/icons/Search'
import IconButton from '@material-ui/core/IconButton'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      display: 'flex',
    },
    search: {
      width: 300
    }
  }),
)

const Page: React.FC = () => {
  const { period, changePeriod } = useDatePeriod()
  const { update: updateSearch, value } = useBindRouterQuery('search')
  const searchInputValue = useRef<HTMLInputElement | undefined>()
  const classes = useStyles()

  const getRefValue = (ref: MutableRefObject<HTMLInputElement | undefined>) => {
    return searchInputValue && searchInputValue.current
      ? searchInputValue.current.value
      : ''
  }


  return (
    <>
      <Typography variant="h6" gutterBottom component="div">
        Задачи
      </Typography>
      <div className={classes.wrapper}>
        <DatePeriod period={period} handleChange={changePeriod} isHidden={value !== ''}/>
        <TextField
          className={classes.search}
          defaultValue={value}
          id="search"
          label="Поиск"
          variant="standard"
          inputRef={searchInputValue}
          onInput={(event: React.ChangeEvent<HTMLInputElement>) => {
            if (event.target.value === '') {
              updateSearch('')
            }
          }}
          onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
            if (event.key === 'Enter') {
              updateSearch(getRefValue(searchInputValue))
            }
          }}
        />
        <IconButton
          aria-label="search"
          href={''}
          onClick={() => {
            updateSearch(value)
          }}
        >
          <SearchIcon/>
        </IconButton>
      </div>
      <JobTable period={period} search={value}/>
    </>
  )
}

export default Page
