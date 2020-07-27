import { SagaIterator } from 'redux-saga'
import { all, call, put, takeEvery } from 'redux-saga/effects'

import {
  createProxy,
  createProxySuccess,
  createProxyFail,
  deleteProxy,
  deleteProxySuccess,
  deleteProxyFail,
  getProxyList,
  getProxySuccess,
  setRequestStatus
} from './actions'
import { RequestStatus } from '@/types'
import { AxiosResponse } from 'axios'
import {ProxyApi} from "@/api/proxy";

function* SGetList({payload}: any): SagaIterator {
  try {
    yield put(setRequestStatus(RequestStatus.PENDING))
    const response: AxiosResponse = yield call(ProxyApi.getList)

    yield put(getProxySuccess(response.data))
    yield put(setRequestStatus(RequestStatus.SUCCESS))
  } catch (error) {
    console.error(error)
    yield put(setRequestStatus(RequestStatus.FAILED))
  }
}

function* SDelete({payload}: any): SagaIterator {
  try {
    yield put(setRequestStatus(RequestStatus.PENDING))
    const response: AxiosResponse = yield call(ProxyApi.delete, payload)

    yield put(deleteProxySuccess(payload))
  } catch (error) {
    console.error(error)
    yield put(setRequestStatus(RequestStatus.FAILED))
  }
}

function* SCreate({payload}: any): SagaIterator {
  try {
    yield put(setRequestStatus(RequestStatus.PENDING))
    const response: AxiosResponse = yield call(ProxyApi.create, payload)

    yield put(createProxySuccess(response.data))
  } catch (error) {
    console.error(error)
    yield put(setRequestStatus(RequestStatus.FAILED))
  }
}

function* pollingSaga() {
  yield all([
    takeEvery(getProxyList, SGetList),
    takeEvery(deleteProxy, SDelete),
    takeEvery(createProxy, SCreate),
  ])
}

export default pollingSaga
