import { createSelector } from 'reselect'
import { AppState } from '@/store'

const getState = (state: AppState) => state.user

export const authStateSelector = createSelector(
  getState,
  state => state.isAuth
)

export const userSelector = createSelector(
  getState,
  state => state.user
)

export const usersListSelector = createSelector(
  getState,
  state => state.usersList
)

export const errorsSelector = createSelector(
  getState,
  state => state.errors
)
