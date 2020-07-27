import React, {MutableRefObject, useRef, useState} from 'react'

import {createStyles, makeStyles, Theme} from '@material-ui/core/styles'
import {UserTable} from "@/components/UserTable";
import Typography from "@material-ui/core/Typography";
import {userSelector} from "@/store/user/selectors"
import {useDispatch, useSelector} from "react-redux";
import {useRouter} from "next/router";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {createProxy} from '@/store/proxy/actions'
import {ProxyTable} from "@/components/ProxyTable";

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

  const [host, setHost] = useState('')
  const [port, setPort] = useState('')
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')

  if (user.role !== 'admin') {
    router.push('/jobs')
  }

  const handleCreate = () => {
    dispatch(createProxy({login, password, host, port}))
  }

  return user.role === 'admin' ? (
    <div>
      <div className={classes.createPanel}>
        <TextField
          value={host}
          id="host"
          label="Хост"
          variant="standard"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setHost(event.target.value)
          }}
        />
        <TextField
          value={port}
          id="port"
          label="Порт"
          variant="standard"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setPort(event.target.value)
          }}
        />
        <TextField
          value={login}
          id="login"
          type={'login'}
          label="Логин"
          variant="standard"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setLogin(event.target.value)
          }}
        />
        <TextField
          value={password}
          id="password"
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
        Прокси
      </Typography>
      <ProxyTable/>
    </div>
  ) : null
}

export default Page

