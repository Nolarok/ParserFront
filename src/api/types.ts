import { TJobData } from '@/store/job/types'
import { TFileData } from '@/store/file/types'


export type DocumentRequest = {
  limit: number,
  offset: number,
  from?: number,
  to?: number
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

export type TGetFileResponse = {
  data: TFileData[],
  count: number,
}

export type TCreateFileRequest = {
  content: string,
  filename: string,
}

export type TGetJobResponse = {
  data: TJobData[],
  count: number,
}
