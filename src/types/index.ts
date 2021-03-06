export interface IOption {
  label: string
  value: string
}

export interface IDictionary<T> {
  [Key: string]: T
}

export enum RequestStatus {
  PENDING = 'pending',
  SUCCESS = 'success',
  FAILED = 'failed',
  DEFAULT = 'default',
}

export type TRequestStatus =
  | RequestStatus.DEFAULT
  | RequestStatus.FAILED
  | RequestStatus.PENDING
  | RequestStatus.SUCCESS

export type TPeriod = {
  from: Date,
  to: Date
}
