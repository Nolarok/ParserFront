import { createReducer } from 'redux-act'

import {
  fetchFilesSuccess,
  setRequestStatus,
  setError,
} from './actions'
import { TRequestStatus, RequestStatus } from '@/types'
import { TFileData } from './types'

export type FileState = {
  files: TFileData[]
  requestStatus: TRequestStatus
  errors: {[key: string]: string}[]
}

export const initialState: FileState = {
  files: [],
  requestStatus: RequestStatus.DEFAULT,
  errors: []
}

const reducer = createReducer<FileState>({}, initialState)

reducer.on(fetchFilesSuccess, (state, payload: TFileData[]) => {
  return {...state, ...{files: payload}}
})

reducer.on(setRequestStatus, (state, payload: TRequestStatus) => {
  return {...state, ...{requestStatus: payload}}
})

reducer.on(setError, (state, payload) => {
  return {...state, ...{errors: payload}}
})

export default reducer
