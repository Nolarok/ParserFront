import { combineReducers } from 'redux'
import JobReducer from '@/store/job/reducers'
import TaskReducer from '@/store/task/reducers'
import FileReducer from '@/store/file/reducers'

const appReducer = combineReducers({
  job: JobReducer,
  task: TaskReducer,
  file: FileReducer,
})

const rootReducer = (state: any, action: any) => {
  return appReducer(state, action)
}

export default rootReducer
