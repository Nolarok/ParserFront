import { axiosInstance } from '@/api/axios'
import { AxiosResponse } from 'axios'
import { TGetJobRequest, TGetJobResponse } from '@/api/types'
import { TJobData } from '@/store/job/types'



export class JobApi {
  static getJob({params, fileId, jobId}: TGetJobRequest): Promise<AxiosResponse<TGetJobResponse>> {
    if (jobId) {
      return axiosInstance.get(`job/${jobId}`)
    }

    if (fileId) {
      return axiosInstance.get(`job/byFileId/${fileId}`,{ params })
    }

    return axiosInstance.get(`job`,{ params })
  }

  static createJob(fileId: string): Promise<AxiosResponse<string>> {
    return axiosInstance.post(`job/create/${fileId}`)
  }

  static startJob(jobId: string): Promise<AxiosResponse> {
    return axiosInstance.post(`job/start/${jobId}`)
  }

  static unloadCSVJob(jobId: string): Promise<AxiosResponse<string[][]>> {
    return axiosInstance.get(`job/unload/${jobId}`)
  }
}
