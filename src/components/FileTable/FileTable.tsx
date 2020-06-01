import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { format } from 'date-fns'
import { useDispatch, useSelector } from 'react-redux'

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableFooter from '@material-ui/core/TableFooter'
import TablePagination from '@material-ui/core/TablePagination'
import Paper from '@material-ui/core/Paper'

import { TablePaginationActions } from '@/components/TablePaginationActions'

import { filesSelector, fileCountSelector, errorsSelector } from '@/store/file/selectors'
import { createJob } from '@/store/job/actions'
import { fetchFiles, contentFile, setError } from '@/store/file/actions'
import { TFileData } from '@/store/file/types'
import IconButton from '@material-ui/core/IconButton'
import VisibilityIcon from '@material-ui/icons/Visibility'
import AddIcon from '@material-ui/icons/Add'
import { useRouter } from 'next/router'
import { Link } from '@material-ui/core'
import { TPeriod } from '@/types'
import { CustomSnackbar } from '@/components/CustomSnackbar'

type Props = {
  period: TPeriod
}

const buildQuery = ({ from, to, limit = 10, offset = 0 }: { from: Date, to: Date, limit?: number, offset?: number }) => {
  return {
    from: +from,
    to: +to,
    limit,
    offset
  }
}

export const FileTable: React.FC<Props> = ({ period }) => {
  const dispatch = useDispatch()
  const rows = useSelector(filesSelector)
  const filesCount = useSelector(fileCountSelector)
  const errors = useSelector(errorsSelector)
  console.log({errors})

  const [currentPage, setCurrentPage] = useState<number>(0)
  const [rowsPerPage, setRowsPerPage] = useState<number>(10)
  const [snackbarIsOpen, setSnackbarIsOpen] = useState<boolean>(false)

  const handleCloseSnackbar = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }

    setSnackbarIsOpen(false)
    dispatch(setError([]))
  }

  useEffect(() => {
    setSnackbarIsOpen(Boolean(errors.length))
  }, [errors])

  useEffect(() => {
    dispatch(fetchFiles({
      params: buildQuery(period)
    }))
  }, [period])

  return (
    <React.Fragment>
      <CustomSnackbar isOpen={snackbarIsOpen} handleClose={handleCloseSnackbar} data={errors} type={'error'}/>
      <TableContainer component={Paper}>
        <Table component={'table'} aria-label="collapsible table">
          <TableHead component={'thead'}>
            <TableRow component={'tr'}>
              <TableCell align="left">File ID</TableCell>
              <TableCell align="left">Имя файла</TableCell>
              <TableCell align="left">Дата создания</TableCell>
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
              <TablePagination
                component={'td'}
                rowsPerPageOptions={[5, 10, 25, { label: 'Все', value: -1 }]}
                colSpan={6}
                count={filesCount}
                rowsPerPage={rowsPerPage}
                page={currentPage}
                labelRowsPerPage={'Записей на странице'}
                SelectProps={{
                  inputProps: { 'aria-label': 'rows per page' },
                  native: true,
                }}
                onChangePage={(event, page) => {
                  setCurrentPage(page)
                  dispatch(
                    fetchFiles({
                        params: buildQuery({
                          limit: page,
                          offset: currentPage,
                          ...period
                        })
                      }
                    )
                  )
                }}
                onChangeRowsPerPage={(element) => {
                  const rowsCount: number = +element.target.value === -1 ? 9999999 : +(element.target.value)
                  setRowsPerPage(+element.target.value)
                  setCurrentPage(0)
                  dispatch(
                    fetchFiles({
                        params: buildQuery({
                          limit: rowsCount,
                          offset: currentPage,
                          ...period
                        })
                      }
                    )
                  )
                }}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </React.Fragment>
  )
}

function Row(props: { row: TFileData }) {
  const { row } = props
  const dispatch = useDispatch()
  const router = useRouter()

  return (
    <React.Fragment>
      <TableRow component={'tr'}>
        <TableCell align="left">{row._id}</TableCell>
        <TableCell align="left">
          <Link href="#" onClick={
            (event: React.SyntheticEvent) => {
              event.preventDefault()
              dispatch(contentFile(row._id))
            }
          }>
            {row.filename}
          </Link>
        </TableCell>
        <TableCell align="left">{format(row.created, 'dd.MM.yyyy')}</TableCell>
        <TableCell align="center">
          <IconButton color="primary" aria-label="upload picture" component="span" onClick={
            () => {
              dispatch(createJob(row._id))
            }
          }>
            <AddIcon/>
          </IconButton>
          <IconButton color="primary" aria-label="upload picture" component="span" onClick={
            () => {
              router.push(`/jobs?id=${row._id}`)
            }
          }>
            <VisibilityIcon/>
          </IconButton>
        </TableCell>
      </TableRow>
    </React.Fragment>
  )
}
