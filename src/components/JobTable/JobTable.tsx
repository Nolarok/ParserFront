import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { format } from 'date-fns'
import { useDispatch, useSelector } from 'react-redux'

import Box from '@material-ui/core/Box'
import Collapse from '@material-ui/core/Collapse'
import IconButton from '@material-ui/core/IconButton'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableFooter from '@material-ui/core/TableFooter'
import TablePagination from '@material-ui/core/TablePagination'
import Paper from '@material-ui/core/Paper'

import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import RefreshIcon from '@material-ui/icons/Refresh'

import AttachFileIcon from '@material-ui/icons/AttachFile'

import { TablePaginationActions } from '@/components/TablePaginationActions'

import { TJobRowData, EJobStatus } from '@/store/job/types'
import { TTaskRowData } from '@/store/task/types'
import { jobsCountSelector, jobsSelector, jobTaskSelector, jobTaskCountSelector } from '@/store/job/selectors'
import { fetchJobs, startJob, unloadCSV } from '@/store/job/actions'
import { fetchTasks } from '@/store/task/actions'
import { Dispatch } from 'redux'
import { TPeriod } from '@/types'

type Props = {
  period: TPeriod
}

export const JobTable: React.FC<Props> = ({period}) => {
  const dispatch = useDispatch()
  const rows = useSelector(jobsSelector)
  const jobsCount = useSelector(jobsCountSelector)

  const [currentPage, setCurrentPage] = useState<number>(0)
  const [rowsPerPage, setRowsPerPage] = useState<number>(10)

  useEffect(() => {
    dispatch(fetchJobs({params: {limit: rowsPerPage, offset: currentPage}}))
  }, [period])

  return (
    <TableContainer component={Paper}>
      <Table component={'table'} aria-label="collapsible table">
        <TableHead component={'thead'}>
          <TableRow component={'tr'}>
            <TableCell/>
            <TableCell align="left">Job ID</TableCell>
            <TableCell align="left">Имя файла</TableCell>
            <TableCell align="left">Дата создания</TableCell>
            <TableCell align="left">Статус</TableCell>
            <TableCell align="center">Действие</TableCell>
          </TableRow>
        </TableHead>
        <TableBody component={'tbody'}>
          {rows.map((row) => (
            <Row key={row._id} row={row}/>
          ))}
        </TableBody>
        <TableFooter component={'tfoot'}>
          <TableRow component={'tr'}>
            <TablePagination component={'td'}
              rowsPerPageOptions={[5, 10, 25, { label: 'Все', value: -1 }]}
              colSpan={6}
              count={jobsCount}
              rowsPerPage={rowsPerPage}
              page={currentPage}
              labelRowsPerPage={'Записей на странице'}
              SelectProps={{
                inputProps: { 'aria-label': 'rows per page' },
                native: true,
              }}
              onChangePage={(event, page) => {
                setCurrentPage(page)
                dispatch(fetchJobs({params: {limit: rowsPerPage, offset: page}}))
              }}
              onChangeRowsPerPage={(element) => {
                const rowsCount:number = +element.target.value === -1 ? 9999999 : +(element.target.value)
                setRowsPerPage(+element.target.value)
                setCurrentPage(0)
                dispatch(fetchJobs({params: {limit: rowsCount, offset: currentPage}}))
              }}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  )
}

function Row(props: { row: TJobRowData }) {
  const { row } = props
  const [open, setOpen] = React.useState(false)
  const [currentPage, setCurrentPage] = useState<number>(0)
  const [rowsPerPage, setRowsPerPage] = useState<number>(5)
  const getTasks = useSelector(jobTaskSelector)
  const taskCount = useSelector(jobTaskCountSelector)

  const tasks = useCallback(() => {
    if (rowsPerPage === -1) {
      return getTasks(row._id)
    }

    return getTasks(row._id).filter((task, index) => {
      return index >= currentPage * rowsPerPage && index < currentPage * rowsPerPage + rowsPerPage
    })
  }, [row, currentPage, rowsPerPage])

  const dispatch = useDispatch()

  return (
    <React.Fragment>
      <TableRow component={'tr'} >
        <TableCell>
          <IconButton href={'#'} aria-label="expand row" size="small" onClick={() => {
            if (row.tasks.length === 0) {
              dispatch(fetchTasks({
                params: { limit: 10, offset: 0, byJobId: true },
                jobId: row._id
              }))
            }
            setOpen(!open)}
          }>
            {renderRowCollapseArrow(row.status as EJobStatus, open)}
          </IconButton>
        </TableCell>
        <TableCell align="left">{row._id}</TableCell>
        <TableCell align="left">{row.fileName}</TableCell>
        <TableCell align="left">{format(row.created, 'dd.MM.yyyy')}</TableCell>
        <TableCell align="left">{JobStatusDictionary[row.status]}</TableCell>
        <TableCell align="center">{renderActionButton(row, dispatch)}</TableCell>
      </TableRow>
      <TableRow component={'tr'}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Table component={'table'} size="small" aria-label="purchases">
                <TableHead component={'thead'}>
                  <TableRow component={'tr'}>
                    <TableCell align='center'>Должник</TableCell>
                    <TableCell align='center'>Исполнительное производство</TableCell>
                    <TableCell align='center'>Реквизиты исполнительного документа</TableCell>
                    <TableCell align='center'>Дата, причина окончания или прекращения ИП</TableCell>
                    <TableCell align='center'>Предмет исполнения, сумма непогашенной задолженности</TableCell>
                    <TableCell align='center'>Судебный пристав-исполнитель</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody component={'tbody'}>
                  {
                    tasks().map((record: TTaskRowData, index: number) => {
                      return (
                        <TableRow component={'tr'} key={record[0] + `${index}`}>
                          <TableCell align="left">{record[2]}</TableCell>
                          <TableCell align="left">{record[3]}</TableCell>
                          <TableCell align="left">{record[4]}</TableCell>
                          <TableCell align="left">{record[5]}</TableCell>
                          <TableCell align="left">{record[6]}</TableCell>
                          <TableCell align="left">{record[7]}</TableCell>
                        </TableRow>
                      )
                    })
                  }
                </TableBody>
                <TableFooter component={'tfoot'}>
                  <TableRow component={'tr'}>
                    <TablePagination component={'td'}
                       rowsPerPageOptions={[5, 10, 25, { label: 'Все', value: -1 }]}
                       colSpan={6}
                       count={taskCount(row._id)}
                       rowsPerPage={rowsPerPage}
                       page={currentPage}
                       labelRowsPerPage={'Записей на странице'}
                       SelectProps={{
                         inputProps: { 'aria-label': 'rows per page' },
                         native: true,
                       }}
                       onChangePage={(event, page) => {
                         setCurrentPage(page)
                       }}
                       onChangeRowsPerPage={(element) => {
                         setRowsPerPage(+element.target.value)
                         setCurrentPage(0)
                       }}
                       ActionsComponent={TablePaginationActions}
                    />
                  </TableRow>
                </TableFooter>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  )
}

function renderRowCollapseArrow(status: EJobStatus, open: boolean) {
  if (![EJobStatus.COMPLETED, EJobStatus.COMPLETED_WITH_ERRORS].includes(status)) {
    return null
  }
  return open ? <KeyboardArrowUpIcon component={'svg'}/> : <KeyboardArrowDownIcon component={'svg'}/>
}

function renderActionButton(job: TJobRowData, dispatch: Dispatch) {
  switch (job.status) {
    case EJobStatus.COMPLETED_WITH_ERRORS:
      return (
        <>
          <IconButton color="primary" aria-label="upload picture" component="span" onClick={
            () => {dispatch(startJob(job._id))}
          }>
            <RefreshIcon/>
          </IconButton>
          <IconButton color="primary" aria-label="upload picture" component="span" onClick={
            () => {dispatch(unloadCSV(job._id))}
          }>
            <AttachFileIcon/>
          </IconButton>
        </>
      )
    case EJobStatus.CREATED:
      return (
        <IconButton color="primary" aria-label="upload picture" component="span" onClick={
          () => {dispatch(startJob(job._id))}
        }>
          <PlayArrowIcon/>
        </IconButton>
      )
    case EJobStatus.COMPLETED:
      return (
        <IconButton color="primary" aria-label="upload picture" component="span" onClick={
          () => {dispatch(unloadCSV(job._id))}
        }>
          <AttachFileIcon />
        </IconButton>
      )
    default:
      return null
  }
}

const JobStatusDictionary: {[key: string]: string} = {
  [EJobStatus.CREATED]: 'Создана',
  [EJobStatus.QUEUE]: 'В очереди',
  [EJobStatus.PROCESS]: 'В работе',
  [EJobStatus.COMPLETED]: 'Завершена',
  [EJobStatus.COMPLETED_WITH_ERRORS]: 'Завершена с ошибками',
}
