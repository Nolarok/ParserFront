import { createAction } from 'redux-act'
import { createAsyncAction } from '@/helpers/actions'
import { TFileData } from './types'
import { TRequestStatus } from '@/types'

export const [
  fetchFiles,
  fetchFilesSuccess,
  fetchFilesFail,
] = createAsyncAction<TFileData[], TFileData[]>('@@FILE/FETCH')

export const setRequestStatus = createAction<TRequestStatus>('@@FILE/REQUEST_STATUS')
export const setError = createAction<{[key: string]: string}[]>('@@FILE/SET_ERROR')
