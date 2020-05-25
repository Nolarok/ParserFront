import { createSelector } from 'reselect'
import { AppState } from '@/store'

const getState = (state: AppState) => state.job

export const jobSelector = createSelector(
  getState,
  state => state.jobData
)
