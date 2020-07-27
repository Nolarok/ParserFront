import { createReducer } from 'redux-act'

import {
  getProxySuccess,
  createProxySuccess,
  deleteProxySuccess
} from './actions'

import cloneDeep from 'lodash/cloneDeep'

export type TProxyState = {
  proxyList: {login: string, password: string, _id: string, host: string, port: string, blocked?: string}[],
  errors: {message: string}[],
}

export const initialState: TProxyState = {
  proxyList: [],
  errors: [],
}

const reducer = createReducer<TProxyState>({}, initialState)

reducer.on(getProxySuccess, (state, payload) => {
  return {...state, proxyList: payload}
})

reducer.on(createProxySuccess, (state, payload) => {
  const _state = cloneDeep(state)
  console.log({payload})
  _state.proxyList = [payload, ..._state.proxyList]
  console.log( _state.proxyList)

  return _state
})
//
reducer.on(deleteProxySuccess, (state, payload) => {
  const _state = cloneDeep(state)
  _state.proxyList = state.proxyList.filter(proxy => proxy._id !== payload)

  console.log('_state.proxyList', _state.proxyList)

  return _state
})

export default reducer
