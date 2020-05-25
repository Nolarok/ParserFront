import { axiosInstance } from '@/api/axios'
import { AxiosResponse } from 'axios'
import { TTaskData } from '@/store/task/types'
import { TGetTaskRequest } from './types'



export class TaskApi {
  static getTask({params, jobId, taskId}: TGetTaskRequest): Promise<AxiosResponse<TTaskData[] | TTaskData>> {
    if (taskId) {
      return axiosInstance.get(`task/${taskId}`)
    }

    if (jobId) {
      return axiosInstance.get(`task/byJobId/${jobId}`, { params })
    }

    return axiosInstance.get(`task`, { params })
  }
}
