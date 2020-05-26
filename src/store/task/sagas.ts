import { SagaIterator } from 'redux-saga'
import { all, call, put, takeEvery } from 'redux-saga/effects'

import { TTaskData } from './types'
import {
  fetchTasks,
  setRequestStatus,
  setError
} from './actions'
import { RequestStatus } from '@/types'
import { AxiosResponse } from 'axios'
import { TaskApi } from '@/api/task'

// TODO ActionMatchingPatternType
function* SFetchTasks({payload}: any): SagaIterator {
  try {
    yield put(setRequestStatus(RequestStatus.PENDING))
    const taskResponse: AxiosResponse<TTaskData[]> = yield call(TaskApi.getTask, {
      params: payload.params,
      jobId: payload.jobId
    })

    yield put(setRequestStatus(RequestStatus.SUCCESS))

    console.log('SFetchTasks response', taskResponse)

  } catch (error) {
    console.error(error)
    yield put(setRequestStatus(RequestStatus.FAILED))
    yield put(setError(error))
  }
}

function* pollingSaga() {
  yield all([
    // takeEvery(fetchTasks, SFetchTasks),
  ])
}

export default pollingSaga
