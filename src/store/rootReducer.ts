import { combineReducers } from 'redux'
import JobReducer from '@/store/job/reducers'
import TaskReducer from '@/store/task/reducers'
import FileReducer from '@/store/file/reducers'

export default combineReducers({
  JobReducer,
  TaskReducer,
  FileReducer,
})
