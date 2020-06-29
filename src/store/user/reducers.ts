import { createReducer } from 'redux-act'

import {
  setErrors,
  setAuth,
  loginSuccess,
  logout
} from './actions'
import { TUser } from '@/store/user/types'

export type TUserState = {
  isAuth: Boolean,
  user: TUser,
  errors: {message: string}[]
}

export const initialState: TUserState = {
  isAuth: false,
  user: {
    login: '',
    role: ''
  },
  errors: [],
}

const reducer = createReducer<TUserState>({}, initialState)

reducer.on(loginSuccess, (state, payload) => {
  return {
    ...state,
    ...{user: {login: payload.login, role: payload.role}},
    ...{isAuth: true}
  }
})

reducer.on(logout, (state) => {
  console.log('logout2')
  return {
    ...state,
    ...{isAuth: false}
  }
})

reducer.on(setErrors, (state, payload) => {
  return {...state, ...{errors: payload}}
})

export default reducer
