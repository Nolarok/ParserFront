import { createReducer } from 'redux-act'

import {
  setErrors,
  setAuth,
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
  },
  errors: [],
}

const reducer = createReducer<TUserState>({}, initialState)

reducer.on(setAuth, (state, payload) => {
  return {
    ...state,
    ...{user: {login: payload.login}},
    ...{isAuth: payload.isAuth}
  }
})

reducer.on(setErrors, (state, payload) => {
  return {...state, ...{errors: payload}}
})

export default reducer
