import { axiosInstance } from '@/api/axios'
import { AxiosResponse } from 'axios'
import { TTaskData } from '@/store/task/types'
import {TCreateUserRequest, TGetTaskRequest} from './types'

export class UserApi {
  static create({login, password}: TCreateUserRequest): Promise<AxiosResponse<string>> {
    return axiosInstance.post(`user`, { login, password })
  }

  static login({login, password}: TCreateUserRequest): Promise<AxiosResponse<string>> {
    return axiosInstance.get(`user`, { params: {login, password} })
  }
}
