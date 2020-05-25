import { axiosInstance } from '@/api/axios'
import { AxiosResponse } from 'axios'
import { TFileData } from '@/store/file/types'
import { TGetFileRequest } from './types'

export class FileApi {
  static create(requestBody: {content: string, mimeType: string}): Promise<AxiosResponse<string>> {
    return axiosInstance.post('file', requestBody, {})
  }

  static getFile({params, id}: TGetFileRequest): Promise<AxiosResponse<TFileData[] | TFileData>> {
    return axiosInstance.get(`file/${id}`, { params })
  }
}
