import React, {useEffect, useState} from 'react'
import clsx from 'clsx'
import {createStyles, makeStyles, useTheme, Theme} from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import CssBaseline from '@material-ui/core/CssBaseline'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import {useStyles} from './style'
import {useRouter} from 'next/router'
import DescriptionIcon from '@material-ui/icons/Description'
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import {useDispatch, useSelector} from 'react-redux'
import {authStateSelector, errorsSelector, userSelector} from '@/store/user/selectors'
import {Auth} from '@/components/Auth'
import {setErrors, setAuth, logout, login as loginAction} from '@/store/user/actions'
import {CustomSnackbar} from '@/components/CustomSnackbar'
import {setError} from '@/store/file/actions'
import Logo from '../static/images/logo/logo.png'


export const Layout: React.FC = ({children}) => {
  const classes = useStyles()
  const theme = useTheme()
  const [open, setOpen] = React.useState(false)
  const router = useRouter()
  const isAuth = useSelector(authStateSelector)
  const errors = useSelector(errorsSelector)
  const user = useSelector(userSelector)

  const dispatch = useDispatch()

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  const handleLogout = () => {
    dispatch(logout())
  }

  const [snackbarIsOpen, setSnackbarIsOpen] = useState(false)

  const handleCloseSnackbar = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }

    setSnackbarIsOpen(false)
    dispatch(setError([]))
  }

  useEffect(() => {

    setSnackbarIsOpen(Boolean(errors.length))
  }, [errors])

  return (
    <>
      <div className={classes.root}>
        <CssBaseline/>
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, {
                [classes.hide]: open,
              })}
            >
              <MenuIcon/>
            </IconButton>
            <Typography variant="h6" noWrap>
              Банк данных ИП ФССП
            </Typography>

            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleLogout}
              edge="start"
              style={{position: 'absolute', right: '60px'}}
            >
              <ExitToAppIcon/>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
            </IconButton>
          </div>
          <Divider/>
          <List>
            <ListItem button onClick={() => {
              router.push('/files')
            }}>
              <ListItemIcon>
                <DescriptionIcon/>
              </ListItemIcon>
              <ListItemText primary={'Файлы'}/>
            </ListItem>
            <ListItem button onClick={() => {
              router.push('/jobs')
            }}>
              <ListItemIcon>
                <FormatListBulletedIcon/>
              </ListItemIcon>
              <ListItemText primary={'Задачи'}/>
            </ListItem>
            {user.role === 'admin' ? (
              <ListItem button onClick={() => {
                router.push('/users')
              }}>
                <ListItemIcon>
                  <AccountCircleIcon/>
                </ListItemIcon>
                <ListItemText primary={'Пользователи'}/>
              </ListItem>
            ) : null}

          </List>
          <Divider/>

        </Drawer>
        <main className={classes.content}>
          <CustomSnackbar
            isOpen={snackbarIsOpen}
            handleClose={handleCloseSnackbar}
            data={errors}
            type={'error'}
          />
          <div className={classes.toolbar}/>
          {isAuth
            ? children
            : <Auth
              authenticate={(login, password) => {
                dispatch(setErrors([]))
                dispatch(loginAction({login, password}))
              }}
              setErrors={(errors) => {
                dispatch(setErrors(errors))
              }}
            />
          }
        </main>
      </div>
      <footer className={classes.footer}>
        <a href="https://firelabs.ru/">
          <img src={Logo} alt="logo" height={60}/>
        </a>
        <ul>
          <li>ООО "Фаер Лабс"</li>
          <li>ИНН/КПП: 7702465507/770201001</li>
          <li>Телефон: <a href="tel:+7(495)235-45-16">+7(495)235-45-16</a></li>
          <li>Почта: <a href="mailto:sale@firelabs.ru">sale@firelabs.ru</a></li>
        </ul>
      </footer>
    </>
  )
}


