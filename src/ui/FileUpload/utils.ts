import { ALLOWED_EXTENSION_TYPES, BYTE_IN_MEGABYTE } from '@/constants/file'

export type TFileError = {
  type: FileErrorsTypes
  message: string
}

export enum FileErrorsTypes {
  SIZE_ERROR = 'SIZE_ERROR',
  EXTENSION_ERROR = 'EXTENSION_ERROR',
}

export const checkFile = (file: File): TFileError | true => {
  const MAX_FILE_SIZE = 5 * BYTE_IN_MEGABYTE

  if (file.size > MAX_FILE_SIZE) {
    return {
      type: FileErrorsTypes.SIZE_ERROR,
      message: `Максимально допустимый размер файла 5МБ`,
    }
  }

  if (!ALLOWED_EXTENSION_TYPES.includes(file.type)) {
    console.log('type', file.type)
    return {
      type: FileErrorsTypes.EXTENSION_ERROR,
      message: `Некорректный формат файла`,
    }
  }

  return true
}
