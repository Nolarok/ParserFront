import { createSelector } from 'reselect'
import { AppState } from '@/store'

const getState = (state: AppState) => state.file

export const filesSelector = createSelector(
  getState,
  state => state.files
)
