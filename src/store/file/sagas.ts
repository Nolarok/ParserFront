import { SagaIterator } from 'redux-saga'
import { all, call, put, takeEvery } from 'redux-saga/effects'

import { FileApi } from '@/api/file'
import { TFileData} from './types'
import {
  fetchFiles,
  fetchFilesSuccess,
  setRequestStatus,
  setError,
  createFile,
  createFileSuccess,
  createFileFail,
  contentFile,
  contentFileSuccess,
  contentFileFail,
} from './actions'
import { RequestStatus } from '@/types'
import { AxiosResponse } from 'axios'
import { TGetFileResponse } from '@/api/types'
import { BASE_URL } from '@/constants'

// TODO ActionMatchingPatternType
function* SFetchFiles({payload}: any): SagaIterator {
  try {
    yield put(setRequestStatus(RequestStatus.PENDING))
    const fileResponse: AxiosResponse<TGetFileResponse> = yield call(FileApi.getFile, {
      params: payload.params
    })

    const data: TFileData[] = fileResponse.data.data.map(file => {
      return {
        _id: file._id,
        filename: file.filename,
        created: new Date(file.created),
      }
    })

    yield put(fetchFilesSuccess({data, count: fileResponse.data.count}))
    yield put(setRequestStatus(RequestStatus.SUCCESS))

    console.log('SFetchFiles response', fileResponse)

  } catch (error) {
    console.error(error)
    yield put(setRequestStatus(RequestStatus.FAILED))
  }
}

function* SContentFile({payload}: any): SagaIterator {
  try {
    const link = document.createElement('a')
    link.setAttribute('href', BASE_URL + 'file/content/' + payload)
    link.setAttribute('target', '_blank')
    document.body.appendChild(link) // Required for FF
    link.click()
  } catch (error) {
    console.error(error)
  }
}

function* SCreateFile({payload}: any): SagaIterator {
  try {
    yield put(setRequestStatus(RequestStatus.PENDING))
    const response: AxiosResponse<TFileData> = yield call(FileApi.create, payload)
    yield put(createFileSuccess({...response.data, ...{created: new Date(response.data.created)}}))
    yield put(setRequestStatus(RequestStatus.SUCCESS))
    yield put(setError([]))
  } catch (error) {
    yield put(setRequestStatus(RequestStatus.FAILED))
    yield put(createFileFail(error.response.data.errors))
  }
}

function* pollingSaga() {
  yield all([
    takeEvery(fetchFiles, SFetchFiles),
    takeEvery(createFile, SCreateFile),
    takeEvery(contentFile, SContentFile),
  ])
}

export default pollingSaga
