import { TTaskData } from '../task/types'

export type TJobData = {
  _id: string,
  fileId: string,
  fileName: string,
  created: Date,
  status: EJobStatus,
  tasksState: TTasksState
}

export type TJobRowData  = {
  tasks: TTaskData[],
} & TJobData

export enum EJobStatus {
  'CREATED' = 'created',
  'QUEUE' = 'queue',
  'PROCESS' = 'process',
  'COMPLETED' = 'completed',
  'COMPLETED_WITH_ERRORS' = 'completed_with_errors',
}

export type TTasksState = {
  failed: number,
  completed: number,
  summary: number,
  notProcessed: number,
}
