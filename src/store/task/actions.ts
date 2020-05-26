import { createAction } from 'redux-act'
import { createAsyncAction } from '@/helpers/actions'
import { TTaskData } from './types'
import { TRequestStatus } from '@/types'
import { TGetTaskRequest } from '@/api/types'

export const [
  fetchTasks,
  fetchTasksSuccess,
  fetchTasksFail,
] = createAsyncAction<TGetTaskRequest, {data: TTaskData[], jobId: string}>('@@TASK/FETCH')


export const setRequestStatus = createAction<TRequestStatus>('@@TASK/REQUEST_STATUS')
export const setError = createAction<{[key: string]: string}[]>('@@TASK/SET_ERROR')
