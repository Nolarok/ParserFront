import { call, all } from 'redux-saga/effects'
import JobSaga from '@/store/job/sagas'
import TaskSaga from '@/store/task/sagas'
import FileSaga from '@/store/file/sagas'
import UserSaga from '@/store/user/sagas'
import ProxySaga from '@/store/proxy/sagas'

export default function*() {
  return yield all([
    call(JobSaga),
    call(TaskSaga),
    call(FileSaga),
    call(UserSaga),
    call(ProxySaga),
  ])
}
