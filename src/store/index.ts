import createSagaMiddleware from 'redux-saga'
import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from './rootReducer'
import rootSaga from './rootSaga'
import { TJobState } from '@/store/job/reducers'
import { TTaskState } from '@/store/task/reducers'
import { TFileState } from '@/store/file/reducers'

export default function makeStore() {
  const sagaMiddleware = createSagaMiddleware()

  const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(sagaMiddleware))
  )

  const storeWithSaga = {
    ...store,
    sagaTask: sagaMiddleware.run(rootSaga),
  }

  return storeWithSaga
}

export type AppState = {
  job: TJobState,
  task: TTaskState,
  file: TFileState,
}
