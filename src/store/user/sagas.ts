import { SagaIterator } from 'redux-saga'
import { all, call, put, takeEvery } from 'redux-saga/effects'
import cookie from '@/api/cookie'
import { parseJwt } from '@/helpers/requests'
import Router from 'next/router'


import { TUser } from './types'
import {
  login,
  loginFail,
  loginSuccess,
  setRequestStatus,
  getUserList,
  getUserListSuccess,
  createUser,
  createUserSuccess,
  deleteUser,
  deleteUserSuccess,
  logout,
  setAuth, setErrors,
} from './actions'
import { RequestStatus } from '@/types'
import { AxiosResponse } from 'axios'
import {UserApi} from "@/api/user";

// TODO ActionMatchingPatternType
function* SLogin({payload}: any): SagaIterator {
  try {
    yield put(setRequestStatus(RequestStatus.PENDING))
    const response: AxiosResponse<{token: string}> = yield call(UserApi.login, {
      login: payload.login,
      password: payload.password,
    })

    cookie.set('token', response.data.token, {
      maxAge: 7200, // 2 часа,
      path: '/',
    })

    const parsedPayload = parseJwt(response.data.token)
    Router.push('/jobs')

    yield put(loginSuccess({login: parsedPayload.login, role: parsedPayload.role}))
    yield put(setRequestStatus(RequestStatus.SUCCESS))
  } catch (error) {
    console.error(error)
    console.log({error})
    yield put(setRequestStatus(RequestStatus.FAILED))
    // yield put(setErrors(RequestStatus.FAILED))
  }
}

function* SGetList({payload}: any): SagaIterator {
  try {
    yield put(setRequestStatus(RequestStatus.PENDING))
    const response: AxiosResponse = yield call(UserApi.getList)

    yield put(getUserListSuccess(response.data))
    yield put(setRequestStatus(RequestStatus.SUCCESS))
  } catch (error) {
    console.error(error)
    yield put(setRequestStatus(RequestStatus.FAILED))
  }
}

function* SDelete({payload}: any): SagaIterator {
  try {
    yield put(setRequestStatus(RequestStatus.PENDING))
    const response: AxiosResponse = yield call(UserApi.delete, payload)

    yield put(deleteUserSuccess(payload))
  } catch (error) {
    console.error(error)
    yield put(setRequestStatus(RequestStatus.FAILED))
  }
}

function* SCreate({payload}: any): SagaIterator {
  try {
    yield put(setRequestStatus(RequestStatus.PENDING))
    const response: AxiosResponse = yield call(UserApi.create, payload)

    yield put(createUserSuccess(response.data))
  } catch (error) {
    console.error(error)
    yield put(setRequestStatus(RequestStatus.FAILED))
  }
}


function SLogout() {
  Router.push('/auth')
  cookie.remove('token', { path: '/' })
}

function* pollingSaga() {
  yield all([
    takeEvery(login, SLogin),
    takeEvery(logout, SLogout),
    takeEvery(getUserList, SGetList),
    takeEvery(deleteUser, SDelete),
    takeEvery(createUser, SCreate),
  ])
}

export default pollingSaga
