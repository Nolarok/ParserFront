import React, { useState } from 'react'

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      maxWidth: 500,
      margin: '0 auto',
      '& .MuiTextField-root': {
        width: '100%',
        margin: 15
      },
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    form: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    header: {
      textTransform: 'uppercase',
      color: '#3f51b5',
      width: '100%',
      textAlign: 'left',
      display: 'block',
      margin: 15,
      fontWeight: 300,
    }
  }),
)

type Props = {
  authenticate: (login: string, password: string) => void
  setErrors: (errors: {message: string}[]) => void
}

export const Auth: React.FC<Props> = ({authenticate, setErrors}) => {
  const classes = useStyles()

  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = () => {
    const errors = []
    if (login.trim() === '') {
      errors.push({message: 'Логин: поле обязательно для заполнения'})
    }

    if (password.trim() === '') {
      errors.push({message: 'Пароль: поле обязательно для заполнения'})
    }

    if (errors.length) {
      setErrors(errors)
      return
    }

    authenticate(login, password)
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography component={'div'} variant={'h5'} className={classes.header}>
              Авторизация
            </Typography>
            <form className={classes.form} noValidate autoComplete="off" onKeyPress={(event: React.KeyboardEvent) => {
              if (event.key === 'Enter') {
                handleLogin()
              }
            }}>
              <TextField
                value={login}
                id="login"
                label="Имя пользователя"
                variant="standard"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setLogin(event.target.value)
                }}
              />
              <TextField
                value={password}
                id="password"
                type={'password'}
                label="Пароль"
                variant="standard"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setPassword(event.target.value)
                }}
              />
            </form>
            <Button
              variant="contained"
              color="primary"
              size="large"
              disableElevation
              onClick={handleLogin}
            >
              Войти
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}
