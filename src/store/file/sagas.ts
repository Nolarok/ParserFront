import { SagaIterator } from 'redux-saga'
import { all, call, put, takeEvery } from 'redux-saga/effects'

import { FileApi } from '@/api/file'
import { TFileData} from './types'
import {
  fetchFiles,
  setRequestStatus,
  setError
} from './actions'
import { RequestStatus } from '@/types'
import { AxiosResponse } from 'axios'

// TODO ActionMatchingPatternType
function* SFetchFiles({payload}: any): SagaIterator {
  try {
    yield put(setRequestStatus(RequestStatus.PENDING))
    const fileResponse: AxiosResponse<TFileData[]> = yield call(FileApi.getFile, {
      params: payload.params
    })

    yield put(setRequestStatus(RequestStatus.SUCCESS))

    console.log('SFetchFiles response', fileResponse)

  } catch (error) {
    console.error(error)
    yield put(setRequestStatus(RequestStatus.FAILED))
    yield put(setError(error))
  }
}

function* pollingSaga() {
  yield all([
    takeEvery(fetchFiles, SFetchFiles),
  ])
}

export default pollingSaga
