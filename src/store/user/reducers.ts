import { createReducer } from 'redux-act'

import {
  setError,
  setAuth,
} from './actions'
import { TUser } from '@/store/user/types'

export type TUserState = {
  isAuth: Boolean,
  user: TUser,
  errors: {[key: string]: string}[]
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

reducer.on(setError, (state, payload) => {
  return {...state, ...{errors: payload}}
})

export default reducer
