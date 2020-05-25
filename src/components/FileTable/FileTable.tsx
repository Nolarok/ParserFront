import React from 'react'
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
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'

import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles'

import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import RefreshIcon from '@material-ui/icons/Refresh'
import AttachFileIcon from '@material-ui/icons/AttachFile'

import { TablePaginationActions } from '@/components/TablePaginationActions'

import { format } from 'date-fns'
import { string } from 'prop-types'
import { TJobRowData, EJobStatus } from '@/store/job/types'
import { TTaskRowData } from '@/store/task/types'

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
})

type Props = {}

export const FileTable: React.FC = () => {
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
              count={rows.length}
              rowsPerPage={30}
              page={0}
              labelRowsPerPage={'Записей на странице'}
              SelectProps={{
                inputProps: { 'aria-label': 'rows per page' },
                native: true,
              }}
              onChangePage={() => {}}
              onChangeRowsPerPage={() => {}}
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
  const classes = useRowStyles()

  return (
    <React.Fragment>
      <TableRow component={'tr'} >
        <TableCell>
          <IconButton href={'#'} aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon component={'svg'}/> : <KeyboardArrowDownIcon component={'svg'}/>}
          </IconButton>
        </TableCell>
        <TableCell align="left">{row._id}</TableCell>
        <TableCell align="left">{row.fileName}</TableCell>
        <TableCell align="left">{format(row.created, 'dd.MM.yyyy')}</TableCell>
        <TableCell align="left">{JobStatusDictionary[row.status]}</TableCell>
        <TableCell align="center">{renderActionButton(row.status as EJobStatus)}</TableCell>
      </TableRow>
      <TableRow component={'tr'}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Задачи
              </Typography>
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
                  {row.tasks.map((historyRow: TTaskRowData) => (
                    <TableRow component={'tr'} key={Math.random().toString()}>
                      <TableCell align="left">{historyRow.debtor}</TableCell>
                      <TableCell align="left">{historyRow.executiveProduction}</TableCell>
                      <TableCell align="left">{historyRow.requisites}</TableCell>
                      <TableCell align="left">{historyRow.date}</TableCell>
                      <TableCell align="left">{historyRow.subject}</TableCell>
                      <TableCell align="left">{historyRow.bailiff}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  )
}

function renderActionButton(status: EJobStatus) {
  switch (status) {
    case EJobStatus.COMPLETED_WITH_ERRORS:
      return (
        <>
          <IconButton color="primary" aria-label="upload picture" component="span">
            <RefreshIcon/>
          </IconButton>
          <IconButton color="primary" aria-label="upload picture" component="span">
            <AttachFileIcon/>
          </IconButton>
        </>
      )
    case EJobStatus.CREATED:
      return (
        <IconButton color="primary" aria-label="upload picture" component="span">
          <PlayArrowIcon/>
        </IconButton>
      )
    case EJobStatus.COMPLETED:
      return (
        <IconButton color="primary" aria-label="upload picture" component="span">
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

const temp: TTaskRowData = {
  debtor: 'string',
  executiveProduction: 'string',
  requisites: 'string',
  date: 'new Date()',
  subject: 'string',
  bailiff: 'string',
  taskId: 'string',
}

const rows: TJobRowData[] = [
  { _id: 'id0', fileId: 'fileId', fileName: 'name', created: new Date(), status: EJobStatus.CREATED, tasks: [temp] },
  { _id: 'id1', fileId: 'fileId', fileName: 'stub', created: new Date(), status: EJobStatus.COMPLETED_WITH_ERRORS, tasks: [temp] },
  { _id: 'id2', fileId: 'fileId', fileName: 'stub', created: new Date(), status: EJobStatus.PROCESS, tasks: [temp] },
  { _id: 'id3', fileId: 'fileId', fileName: 'stub', created: new Date(), status: EJobStatus.QUEUE, tasks: [temp] },
  { _id: 'id4', fileId: 'fileId', fileName: 'stub', created: new Date(), status: EJobStatus.COMPLETED, tasks: [temp] },
]
