import React, {MutableRefObject, useRef, useState} from 'react'

import {createStyles, makeStyles, Theme} from '@material-ui/core/styles'
import {UserTable} from "@/components/UserTable";
import Typography from "@material-ui/core/Typography";
import {userSelector} from "@/store/user/selectors"
import {useDispatch, useSelector} from "react-redux";
import {useRouter} from "next/router";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {createUser} from '@/store/user/actions'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    createPanel: {
      display: 'flex',
      alignItems: 'center',
      '& > *': {
        marginRight: 20,
        marginBottom: 20
      }
    }
  }),
)

const Page: React.FC = () => {
  const classes = useStyles()
  const user = useSelector(userSelector)
  const router = useRouter()
  const dispatch = useDispatch()

  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')

  if (user.role !== 'admin') {
    router.push('/jobs')
  }

  const handleCreate = () => {
    dispatch(createUser({login, password}))
  }

  return user.role === 'admin' ? (
    <div>
      <div className={classes.createPanel}>
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
        <Button
          variant="contained"
          color="primary"
          size="medium"
          disableElevation
          onClick={handleCreate}
        >
          Создать
        </Button>
      </div>
      <Typography variant="h6" gutterBottom component="div">
        Пользователи
      </Typography>
      <UserTable/>
    </div>
  ) : null
}

export default Page

