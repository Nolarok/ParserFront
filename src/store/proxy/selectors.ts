import { createSelector } from 'reselect'
import { AppState } from '@/store'

const getState = (state: AppState) => state.proxy

export const proxySelector = createSelector(
  getState,
  state => state.proxyList
)

export const errorsSelector = createSelector(
  getState,
  state => state.errors
)
