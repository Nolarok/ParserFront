import { SagaIterator } from 'redux-saga'
import { all, call, put, takeEvery } from 'redux-saga/effects'

import { JobApi } from '@/api/job'
import { TJobData, TJobRowData } from './types'
import {
  fetchJobs,
  fetchJobsSuccess,
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

// TODO ActionMatchingPatternType
function* SFetchJobs({payload}: any): SagaIterator {
  try {
    yield put(setRequestStatus(RequestStatus.PENDING))
    const jobResponse: AxiosResponse<TGetJobResponse> = yield call(JobApi.getJob, {
      params: payload.params
    })

    const jobData:TJobRowData[] = jobResponse.data.data.map((job: TJobData) => {
      return {
        ...job,
        ...{created: new Date(job.created)},
        ...{tasks: []}}
    })

    console.log({jobResponse})

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

function* SFetchTasks({payload}: any): SagaIterator {
  try {
    yield put(setRequestStatus(RequestStatus.PENDING))
    const taskResponse: AxiosResponse<TTaskData[]> = yield call(TaskApi.getTask, {
      params: payload.params,
      jobId: payload.jobId,
    })

    const taskData:TTaskData[] = taskResponse.data.map((task: TTaskData) => {
      return {
        ...task,
        ...{created: new Date(task.created)},
        ...{tasks: []}}
    })

    yield put(fetchTasksSuccess({data: taskData, jobId: payload.jobId}))
    yield put(setTaskRequestStatus(RequestStatus.SUCCESS))

    console.log('SFetchTasks response', taskResponse)

  } catch (error) {
    console.error(error)
    yield put(setRequestStatus(RequestStatus.FAILED))
    yield put(setTaskError(error))
  }
}

function* pollingSaga() {
  yield all([
    takeEvery(fetchJobs, SFetchJobs),
    takeEvery(fetchTasks, SFetchTasks),
  ])
}

export default pollingSaga
