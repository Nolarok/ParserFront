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
  logout,
  setAuth,
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

    cookie.set('token', response.data, {
      maxAge: 7200, // 2 часа,
      path: '/',
    })

    const parsedPayload = parseJwt(response.data.token)
    console.log({parsedPayload})

    Router.replace('/jobs')

    yield put(loginSuccess({login: parsedPayload.login, role: parsedPayload.role}))
    yield put(setRequestStatus(RequestStatus.SUCCESS))
  } catch (error) {
    console.error(error)
    yield put(setRequestStatus(RequestStatus.FAILED))
  }
}

function SLogout() {
  console.log('SLogout')
  Router.replace('/auth')
  cookie.remove('token', { path: '/' })
}

function* pollingSaga() {
  yield all([
    takeEvery(login, SLogin),
    takeEvery(logout, SLogout),
  ])
}

export default pollingSaga
