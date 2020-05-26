import { createReducer } from 'redux-act'
import { cloneDeep } from 'lodash'

import {
  fetchJobsSuccess,
  setElementsNumber,
  setRequestStatus,
  setError,
} from './actions'

import {
  fetchTasksSuccess
} from '@/store/task/actions'


import { TRequestStatus, RequestStatus } from '@/types'
import { TJobRowData } from './types'
import { TTaskData } from '@/store/task/types'

export type TJobState = {
  jobData: TJobRowData[]
  count: number
  requestStatus: TRequestStatus
  errors: { [key: string]: string }[]
}

export const initialState: TJobState = {
  jobData: [],
  count: 0,
  requestStatus: RequestStatus.DEFAULT,
  errors: []
}

const reducer = createReducer<TJobState>({}, initialState)

reducer.on(fetchJobsSuccess, (state, payload: TJobRowData[]) => {
  return { ...state, ...{ jobData: payload } }
})

reducer.on(fetchTasksSuccess, (state, payload: { data: TTaskData[], jobId: string }) => {
  const _state = cloneDeep(state)
  const jobIndex = state.jobData.findIndex(job => job._id === payload.jobId)
  _state.jobData[jobIndex].tasks = payload.data

  return _state
})


reducer.on(setRequestStatus, (state, payload) => {
  return { ...state, ...{ requestStatus: payload } }
})

reducer.on(setError, (state, payload) => {
  return { ...state, ...{ errors: payload } }
})

reducer.on(setElementsNumber, (state, payload) => {
  return { ...state, ...{ count: payload } }
})

export default reducer
