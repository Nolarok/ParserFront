import { createAction } from 'redux-act'
import { createAsyncAction } from '@/helpers/actions'
import { TFileData } from './types'
import { TRequestStatus } from '@/types'
import { TCreateFileRequest, TGetFileRequest, TGetFileResponse } from '@/api/types'
import { AxiosError } from 'axios'

export const [
  fetchFiles,
  fetchFilesSuccess,
  fetchFilesFail,
] = createAsyncAction<TGetFileRequest, TGetFileResponse>('@@FILE/FETCH')

export const [
  createFile,
  createFileSuccess,
  createFileFail,
] = createAsyncAction<TCreateFileRequest, TFileData>('@@FILE/CREATE')

export const [
  contentFile,
  contentFileSuccess,
  contentFileFail,
] = createAsyncAction<string, string[][]>('@@FILE/GET_CONTENT')

export const setRequestStatus = createAction<TRequestStatus>('@@FILE/REQUEST_STATUS')
export const setError = createAction<{type: string, error: any}>('@@FILE/SET_ERROR')
