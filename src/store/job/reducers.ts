import { createReducer } from 'redux-act'
import { cloneDeep } from 'lodash'

import {
  fetchJobsSuccess,
  createJobSuccess,
  createJobFail,
  setElementsNumber,
  setError,
  setRequestStatus,
  startJobSuccess,
  unloadReportSuccess,
  setCreateJobStatus
} from './actions'

import { fetchTasksSuccess } from '@/store/task/actions'


import { RequestStatus, TRequestStatus } from '@/types'
import { EJobStatus, TJobRowData } from './types'
import { TTaskData } from '@/store/task/types'

export type TJobState = {
  jobData: TJobRowData[]
  count: number
  requestStatus: TRequestStatus
  errors: { [key: string]: string }[]
  createJobStatus: TRequestStatus
}

export const initialState: TJobState = {
  jobData: [],
  count: 0,
  requestStatus: RequestStatus.DEFAULT,
  errors: [],
  createJobStatus: RequestStatus.DEFAULT
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

reducer.on(startJobSuccess, (state, payload) => {
  const _state = cloneDeep(state)

  const job = _state.jobData.find(job => job._id === payload.jobId)

  if (!job) {
    return _state
  }

  job.status = payload.status === 200 ? EJobStatus.PROCESS : EJobStatus.QUEUE

  return _state
})

reducer.on(createJobSuccess, (state) => {
  return { ...state, ...{ createJobStatus: RequestStatus.SUCCESS} }
})

reducer.on(createJobFail, (state) => {
  return { ...state, ...{ createJobStatus: RequestStatus.FAILED } }
})

reducer.on(setCreateJobStatus, (state, payload) => {
  return { ...state, ...{ createJobStatus: payload } }
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

reducer.on(unloadReportSuccess, (state, payload) => {
  return state
})

export default reducer
