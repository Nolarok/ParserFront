import { axiosInstance } from '@/api/axios'
import { AxiosResponse } from 'axios'
import {TCreateUserRequest, TGetTaskRequest} from './types'

export class UserApi {
  static create({login, password}: TCreateUserRequest): Promise<AxiosResponse<{login: string, role: string, _id: string}>> {
    return axiosInstance.post(`user`, { login, password })
  }

  static login({login, password}: TCreateUserRequest): Promise<AxiosResponse<string>> {
    return axiosInstance.get(`user`, { params: {login, password} })
  }

  static getList(): Promise<AxiosResponse<{login: string, role: string, _id: string}[]>> {
    return axiosInstance.get(`user/list`)
  }

  static delete(id: string): Promise<AxiosResponse> {
    return axiosInstance.delete(`user/${id}`)
  }
}
