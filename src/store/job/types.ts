import { TTaskRowData } from '../task/types'

export type TJobData = {
  _id: string,
  fileId: string,
  fileName: string,
  created: Date,
  status: string,
}

export type TJobRowData  = {
  tasks: TTaskRowData[],
} & TJobData

export enum EJobStatus {
  'CREATED' = 'created',
  'QUEUE' = 'queue',
  'PROCESS' = 'process',
  'COMPLETED' = 'completed',
  'COMPLETED_WITH_ERRORS' = 'completed_with_errors',
}
