import { createAction } from 'redux-act'
import { TUser } from '@/store/user/types'
import {createAsyncAction} from "@/helpers/actions";
import {TGetTaskRequest} from "@/api/types";
import {TTaskData} from "@/store/task/types";
import {TRequestStatus} from "@/types";

export const [
  createProxy,
  createProxySuccess,
  createProxyFail,
] = createAsyncAction<
  {login: string, password: string, host: string, port: string},
  {login: string, password: string, _id: string, host: string, port: string}
  >('@@PROXY/CREATE')


export const [
  getProxyList,
  getProxySuccess,
  getProxyFail,
] = createAsyncAction<{login: string, password: string, _id: string, host: string, port: string}[]>('@@PROXY/GET_LIST', true)

export const [
  deleteProxy,
  deleteProxySuccess,
  deleteProxyFail,
] = createAsyncAction<string, string>('@@PROXY/DELETE')

export const setRequestStatus = createAction<TRequestStatus>('@@PROXY/REQUEST_STATUS')

export const setErrors = createAction<{message: string}[]>('@@PROXY/SET_ERROR')
