import { createAction } from 'redux-act'
import { TUser } from '@/store/user/types'
import {createAsyncAction} from "@/helpers/actions";
import {TGetTaskRequest} from "@/api/types";
import {TTaskData} from "@/store/task/types";
import {TRequestStatus} from "@/types";

export const [
  createUser,
  createUserSuccess,
  createUserFail,
] = createAsyncAction<{login: string, password: string}, {login: string, role: string, _id: string}>('@@USER/CREATE')

export const [
  login,
  loginSuccess,
  loginFail,
] = createAsyncAction<{login: string, password: string}, {login: string, role: string}>('@@USER/LOGIN')

export const [
  getUserList,
  getUserListSuccess,
  getUserListFail,
] = createAsyncAction<{login: string, role: string, _id: string}[]>('@@USER/GET_LIST', true)

export const [
  deleteUser,
  deleteUserSuccess,
  deleteUserFail,
] = createAsyncAction<string, string>('@@USER/DELETE')

export const setRequestStatus = createAction<TRequestStatus>('@@USER/REQUEST_STATUS')
export const logout = createAction('@@USER/LOGOUT')


export const setAuth = createAction<boolean>('@@USER/SET_AUTH')
export const setErrors = createAction<{message: string}[]>('@@USER/SET_ERROR')
