import { TJobData } from '@/store/job/types'


export type DocumentRequest = {
  limit: number,
  offset: number,
}

export type TGetJobRequest = {
  params?: DocumentRequest
  fileId?: string,
  jobId?: string,
}

export type TGetTaskRequest = {
  params?: DocumentRequest & {byJobId?: boolean}
  jobId?: string,
  taskId?: string,
}

export type TGetFileRequest = {
  params?: DocumentRequest
  id?: string,
}

export type TGetJobResponse = {
  data: TJobData[],
  count: number
}
