import { SagaIterator } from 'redux-saga'
import { all, call, put, takeEvery } from 'redux-saga/effects'

import { JobApi } from '@/api/job'
import { TJobData, TJobRowData } from './types'
import {
  createJob,
  createJobSuccess,
  createJobFail,
  fetchJobs,
  fetchJobsSuccess,
  startJob,
  startJobSuccess,
  unloadCSV,
  setElementsNumber,
  setRequestStatus,
  setError
} from '@/store/job/actions'

import {
  fetchTasks,
  fetchTasksSuccess,
  setError as setTaskError,
  setRequestStatus as setTaskRequestStatus
} from '@/store/task/actions'


import { RequestStatus } from '@/types'
import { AxiosResponse } from 'axios'
import { TaskApi } from '@/api/task'
import { TTaskData } from '@/store/task/types'
import { TGetJobResponse } from '@/api/types'
import { loadAsCSV } from '@/helpers/csv'

// TODO ActionMatchingPatternType
function* SFetchJobs({ payload }: any): SagaIterator {
  try {
    yield put(setRequestStatus(RequestStatus.PENDING))
    const jobResponse: AxiosResponse<TGetJobResponse> = yield call(JobApi.getJob, {
      params: payload.params
    })

    const jobData: TJobRowData[] = jobResponse.data.data.map((job: TJobData) => {
      return {
        ...job,
        ...{ created: new Date(job.created) },
        ...{ tasks: [] }
      }
    })

    yield put(fetchJobsSuccess(jobData))
    yield put(setElementsNumber(jobResponse.data.count))
    yield put(setRequestStatus(RequestStatus.SUCCESS))

    console.log('SFetchJobs response', jobResponse)

  } catch (error) {
    console.error(error)
    yield put(setRequestStatus(RequestStatus.FAILED))
    yield put(setError(error))
  }
}

function* SFetchTasks({ payload }: any): SagaIterator {
  try {
    yield put(setRequestStatus(RequestStatus.PENDING))
    const taskResponse: AxiosResponse<TTaskData[]> = yield call(TaskApi.getTask, {
      params: payload.params,
      jobId: payload.jobId,
    })

    const taskData: TTaskData[] = taskResponse.data.map((task: TTaskData) => {
      return {
        ...task,
        ...{ created: new Date(task.created) },
        ...{ tasks: [] }
      }
    })

    yield put(fetchTasksSuccess({ data: taskData, jobId: payload.jobId }))
    yield put(setTaskRequestStatus(RequestStatus.SUCCESS))

    console.log('SFetchTasks response', taskResponse)

  } catch (error) {
    console.error(error)
    yield put(setRequestStatus(RequestStatus.FAILED))
    yield put(setTaskError(error))
  }
}

function* SStartJob({ payload }: any): SagaIterator {
  try {
    yield put(setRequestStatus(RequestStatus.PENDING))
    const response: AxiosResponse = yield call(JobApi.startJob, payload)
    yield put(startJobSuccess({
      jobId: payload,
      status: response.status
    }))
    yield put(setRequestStatus(RequestStatus.SUCCESS))
  } catch (error) {
    console.error(error)
    yield put(setRequestStatus(RequestStatus.FAILED))
  }
}

function* SUnloadCSV({ payload }: any): SagaIterator {
  try {
    const response: AxiosResponse<string[][]> = yield call(JobApi.unloadCSVJob, payload)
    const headers = [
      'Должник',
      'Исполнительное производство',
      'Реквизиты исполнительного документа',
      'Дата, причина окончания или прекращения ИП',
      'Предмет исполнения, сумма непогашенной задолженности',
      'Судебный пристав-исполнитель',
    ]
    loadAsCSV(response.data, headers)

  } catch (error) {
    console.error(error)
    // yield put(setRequestStatus(RequestStatus.FAILED))
  }
}

function* SCreateJob({ payload }: any): SagaIterator {
  try {
    yield put(setRequestStatus(RequestStatus.PENDING))
    const response: AxiosResponse = yield call(JobApi.createJob, payload)
    yield put(createJobSuccess())
    yield put(setRequestStatus(RequestStatus.SUCCESS))
  } catch (error) {
    console.error(error)
    yield put(setRequestStatus(RequestStatus.FAILED))
    yield put(createJobFail(error))
    // yield put(setRequestStatus(RequestStatus.FAILED))
  }
}

function* pollingSaga() {
  yield all([
    takeEvery(fetchJobs, SFetchJobs),
    takeEvery(fetchTasks, SFetchTasks),
    takeEvery(startJob, SStartJob),
    takeEvery(unloadCSV, SUnloadCSV),
    takeEvery(createJob, SCreateJob),
  ])
}

export default pollingSaga
