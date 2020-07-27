import createSagaMiddleware from 'redux-saga'
import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from './rootReducer'
import rootSaga from './rootSaga'
import { TJobState } from '@/store/job/reducers'
import { TTaskState } from '@/store/task/reducers'
import { TFileState } from '@/store/file/reducers'
import { TUserState } from '@/store/user/reducers'
import {TProxyState} from "@/store/proxy/reducers";
import { loadState, saveState } from '@/store/localStorage'
import throttle from 'lodash/throttle'

export default function makeStore() {
  const sagaMiddleware = createSagaMiddleware()

  const persistedState = loadState()

  const store = createStore(
    rootReducer,
    persistedState,
    composeWithDevTools(applyMiddleware(sagaMiddleware))
  )

  const storeWithSaga = {
    ...store,
    sagaTask: sagaMiddleware.run(rootSaga),
  }

  storeWithSaga.subscribe(
    throttle(() => {
      saveState({user: {...store.getState().user, errors: [], usersList: []}})
    }, 1000)
  )

  return storeWithSaga
}

export type AppState = {
  job: TJobState,
  task: TTaskState,
  file: TFileState,
  user: TUserState,
  proxy: TProxyState,
}
