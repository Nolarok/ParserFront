import { createReducer } from 'redux-act'

import {
  fetchJobsSuccess,
  setRequestStatus,
  setError,
} from './actions'
import { TRequestStatus, RequestStatus } from '@/types'
import { TJobRowData } from './types'

export type JobState = {
  jobData:  TJobRowData[]
  requestStatus: TRequestStatus
  errors: {[key: string]: string}[]
}

export const initialState: JobState = {
  jobData:  [],
  requestStatus: RequestStatus.DEFAULT,
  errors: []
}

const reducer = createReducer<JobState>({}, initialState)

reducer.on(fetchJobsSuccess, (state, payload) => {
  return {...state, ...{jobData: payload}}
})

reducer.on(setRequestStatus, (state, payload) => {
  return {...state, ...{requestStatus: payload}}
})

reducer.on(setError, (state, payload) => {
  return {...state, ...{errors: payload}}
})

export default reducer
