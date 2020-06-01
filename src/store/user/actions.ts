import { createAction } from 'redux-act'
import { TUser } from '@/store/user/types'

export const setAuth = createAction<{isAuth: boolean} & TUser>('@@USER/SET_AUTH')
export const setErrors = createAction<{message: string}[]>('@@USER/SET_ERROR')
