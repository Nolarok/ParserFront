import { createReducer } from 'redux-act'

import {
  createFileSuccess,
  fetchFilesSuccess,
  createFileFail,
  setRequestStatus,
  setError,
} from './actions'
import { TRequestStatus, RequestStatus } from '@/types'
import { TFileData } from './types'
import { TGetFileResponse } from '@/api/types'

export type TFileState = {
  files: TFileData[]
  requestStatus: TRequestStatus
  count: number
  errors: {message: string}[]
}

export const initialState: TFileState = {
  files: [],
  requestStatus: RequestStatus.DEFAULT,
  count: 0,
  errors: []
}

const reducer = createReducer<TFileState>({}, initialState)

reducer.on(createFileSuccess, (state, payload: TFileData) => {
  return {...state, ...{files: [payload, ...state.files]}}
})

reducer.on(fetchFilesSuccess, (state, payload: TGetFileResponse) => {
  return {...state, ...{files: payload.data}, ...{count: payload.count}}
})

reducer.on(setRequestStatus, (state, payload: TRequestStatus) => {
  return {...state, ...{requestStatus: payload}}
})

reducer.on(createFileFail, (state, payload) => {
  return {...state, ...{errors: payload}}
})

reducer.on(setError, (state, payload) => {
  return {...state, ...{errors: payload}}
})

export default reducer
