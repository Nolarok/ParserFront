import { applyMiddleware, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from './rootReducer'
import { JobState } from '@/store/job/reducers'
import { TaskState } from '@/store/task/reducers'
import { FileState } from '@/store/file/reducers'
import rootSaga from './rootSaga'

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
  job: JobState,
  task: TaskState,
  file: FileState,
}
