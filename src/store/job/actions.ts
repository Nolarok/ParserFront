import { createAction } from 'redux-act'
import { createAsyncAction } from '@/helpers/actions'
import { TJobRowData } from '@/store/job/types'
import { TRequestStatus } from '@/types'
import { TGetJobRequest } from '@/api/types'

export const [
  fetchJobs,
  fetchJobsSuccess,
  fetchJobsFail,
] = createAsyncAction<TGetJobRequest, TJobRowData[]>('@@JOB/FETCH')

export const setRequestStatus = createAction<TRequestStatus>('@@JOB/REQUEST_STATUS')
export const setError = createAction<{[key: string]: string}[]>('@@JOB/SET_ERROR')
