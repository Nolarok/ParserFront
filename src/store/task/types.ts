export type TTaskRowData = {[key: string]: string}

export enum ETaskStatus {
  'CREATED' = 'created',
  'QUEUE' = 'queue',
  'ERROR' = 'error',
  'PROCESS' = 'process',
  'COMPLETED' = 'completed',
}

export type TTaskData = {
  _id: string
  status: ETaskStatus,
  result: TTaskRowData[],
  created: Date,
  jobId: string,
}


// export type TTaskRowData = {
//   id: string,
//   debtor: string,
//   executiveProduction: string,
//   requisites: string,
//   date: string,
//   subject: string,
//   bailiff: string,
//   taskId: string,
// }
