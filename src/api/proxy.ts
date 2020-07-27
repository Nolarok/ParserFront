import { axiosInstance } from '@/api/axios'
import { AxiosResponse } from 'axios'
import {TCreateProxyRequest, TCreateUserRequest, TGetTaskRequest} from './types'

export class ProxyApi {
  static create({login, password, host, port}: TCreateProxyRequest): Promise<AxiosResponse<{login: string, password: string, _id: string, host: string, port: string}>> {
    return axiosInstance.post(`proxy`, { login, password, host, port })
  }

  static getList(): Promise<AxiosResponse<{login: string, password: string, _id: string, host: string, port: string}[]>> {
    return axiosInstance.get(`proxy`)
  }

  static delete(id: string): Promise<AxiosResponse> {
    return axiosInstance.delete(`proxy/${id}`)
  }
}
