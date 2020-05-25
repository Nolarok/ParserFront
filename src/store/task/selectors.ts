import { createSelector } from 'reselect'
import { AppState } from '@/store'

const getState = (state: AppState) => state.task

export const tasksSelector = createSelector(
  getState,
  state => state.tasks
)
