import { createReducer } from 'redux-act'

import {
  fetchFilesSuccess,
  setRequestStatus,
  setError,
} from './actions'
import { TRequestStatus, RequestStatus } from '@/types'
import { TFileData } from './types'

export type TFileState = {
  files: TFileData[]
  requestStatus: TRequestStatus
  errors: {[key: string]: string}[]
}

export const initialState: TFileState = {
  files: [],
  requestStatus: RequestStatus.DEFAULT,
  errors: []
}

const reducer = createReducer<TFileState>({}, initialState)

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
