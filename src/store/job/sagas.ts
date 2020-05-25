import { SagaIterator } from 'redux-saga'
import { all, call, put, takeEvery } from 'redux-saga/effects'

import { JobApi } from '@/api/job'
import { TJobData, TJobRowData } from './types'
import {
  fetchJobs,
  setRequestStatus,
  setError
} from './actions'
import { RequestStatus } from '@/types'
import { AxiosResponse } from 'axios'

// TODO ActionMatchingPatternType
function* SFetchJobs({payload}: any): SagaIterator {
  try {
    yield put(setRequestStatus(RequestStatus.PENDING))
    const jobResponse: AxiosResponse<TJobData[]> = yield call(JobApi.getJob, {
      params: payload.params
    })

    yield put(setRequestStatus(RequestStatus.SUCCESS))

    console.log('SFetchJobs response', jobResponse)

  } catch (error) {
    console.error(error)
    yield put(setRequestStatus(RequestStatus.FAILED))
    yield put(setError(error))
  }
}

function* pollingSaga() {
  yield all([
    takeEvery(fetchJobs, SFetchJobs),
  ])
}

export default pollingSaga
