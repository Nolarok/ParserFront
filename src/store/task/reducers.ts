import { createReducer } from 'redux-act'

import {
  fetchTasksSuccess,
  setRequestStatus,
  setError,
} from './actions'
import { TRequestStatus, RequestStatus } from '@/types'
import { TTaskData } from '@/store/task/types'

export type TaskState = {
  tasks:  {[key: string]: TTaskData[]}
  requestStatus: TRequestStatus
  errors: {[key: string]: string}[]
}

export const initialState: TaskState = {
  tasks: {},
  requestStatus: RequestStatus.DEFAULT,
  errors: []
}

const reducer = createReducer<TaskState>({}, initialState)

reducer.on(fetchTasksSuccess, (state, payload: TTaskData[]) => {
  const tasks = payload.reduce((acc: {[key: string]: TTaskData[]}, item: TTaskData) => {
    if (!acc[item._id]) {
      acc[item._id] = [item]
    } else {
      acc[item._id].push(item)
    }

    return acc
  }, {})
  return {...state, ...{tasks}}
})

reducer.on(setRequestStatus, (state, payload) => {
  return {...state, ...{requestStatus: payload}}
})

reducer.on(setError, (state, payload) => {
  return {...state, ...{errors: payload}}
})

export default reducer
