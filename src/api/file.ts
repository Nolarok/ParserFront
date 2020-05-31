import { axiosInstance } from '@/api/axios'
import { AxiosResponse } from 'axios'
import { TFileData } from '@/store/file/types'
import { TCreateFileRequest, TGetFileRequest, TGetFileResponse } from './types'

export class FileApi {
  static create(requestBody: TCreateFileRequest): Promise<AxiosResponse<TFileData>> {
    return axiosInstance.post('file', requestBody, {})
  }

  static getFile({params, id}: TGetFileRequest): Promise<AxiosResponse<TGetFileResponse>> {
    return axiosInstance.get(`file/${id || ''}`, { params })
  }

  static getContent(id: string): Promise<AxiosResponse<string[][]>> {
    return axiosInstance.get(`file/content/${id}`)
  }
}
