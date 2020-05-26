import { createSelector } from 'reselect'
import { AppState } from '@/store'
import { TTaskData, TTaskRowData } from '@/store/task/types'

const getState = (state: AppState) => {
  return state.job
}

export const jobsSelector = createSelector(
  getState,
  state => {
    return state.jobData
  }
)

export const jobsCountSelector = createSelector(
  getState,
  state => {
    return state.count
  }
)

export const jobTaskSelector = createSelector(
  getState,
  state => (jobId: string) => {
    const job = state.jobData.find(job => job._id === jobId)
    if (!job) {
      return []
    }

    const result = job.tasks.reduce((acc: string[][], task: TTaskData) => {
      return [
        ...acc,
        ...(task.result.map((record: TTaskRowData) => {
          return [task.jobId, task.status, ...record]
        })),
      ]

    }, [])

    return result
  }
)

export const jobTaskCountSelector = createSelector(
  getState,
  state => (jobId: string) => {
    const job = state.jobData.find(job => job._id === jobId)
    if (!job) {
      return 0
    }

    const result = job.tasks.reduce((acc, task) => {
      acc += task.result.length
      return acc
    }, 0)

    return result
  }
)
