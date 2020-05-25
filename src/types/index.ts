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

export type TFormField<T> = {
  value: T
  errors: string[]
}

export enum FileType {
  VIDEO = 'video',
  IMAGE = 'image',
}

export type FileInfo = {
  id: string
  type: FileType
  labels: string[]
  imageUrl?: string
  videoId?: string
}

export enum Role {
  CUSTOMER = 'Заказчик',
  EXECUTOR = 'Исполнитель',
}
