import { createReducer } from 'redux-act'

import {
  setErrors,
  deleteUserSuccess,
  getUserListSuccess,
  loginSuccess,
  createUserSuccess,
  loginFail,
  logout
} from './actions'
import { TUser } from '@/store/user/types'

export type TUserState = {
  isAuth: Boolean,
  user: TUser,
  usersList: {login: string, role: string, _id: string}[],
  errors: {message: string}[],
}

export const initialState: TUserState = {
  isAuth: false,
  user: {
    login: '',
    role: ''
  },
  usersList: [],
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
  return {
    ...state,
    ...{isAuth: false}
  }
})

reducer.on(loginFail, (state) => {
  return {
    ...state,
    ...{errors: [...state.errors, {message: 'Авторизация: Проверьте правильность данных'}]}
  }
})

reducer.on(getUserListSuccess, (state, payload) => {
  return {
    ...state,
    ...{usersList: payload}
  }
})

reducer.on(deleteUserSuccess, (state, id) => {
  const users = state.usersList.filter(user => user._id !== id)

  return {
    ...state,
    ...{usersList: users}
  }
})

reducer.on(createUserSuccess, (state, user) => {
    return {
    ...state,
    ...{usersList: [user, ...state.usersList]}
  }
})

reducer.on(setErrors, (state, payload) => {
  return {...state, ...{errors: payload}}
})

export default reducer
