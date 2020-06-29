import React, {useCallback, useEffect, useState} from 'react'
import {format} from 'date-fns'
import {useDispatch, useSelector} from 'react-redux'

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

import Paper from '@material-ui/core/Paper'

import {usersListSelector} from '@/store/user/selectors'
import {getUserList, deleteUser} from '@/store/user/actions'
import DeleteIcon from "@material-ui/icons/Delete"
import IconButton from "@material-ui/core/IconButton"

type Props = {}

export const UserTable: React.FC<Props> = () => {
  const dispatch = useDispatch()
  const rows = useSelector(usersListSelector) || []

  console.log({rows})

  useEffect(() => {
    dispatch(getUserList())
  }, [])

  return (
    <TableContainer component={Paper}>
      <Table component={'table'} aria-label="collapsible table">
        <TableHead component={'thead'}>
          <TableRow component={'tr'}>
            <TableCell align="left">Имя пользователя</TableCell>
            <TableCell align="left">Роль</TableCell>
            <TableCell/>
          </TableRow>
        </TableHead>
        <TableBody component={'tbody'}>
          {rows.map((row) => {
            return (
              <TableRow key={row._id} component={'tr'}>
                <TableCell align="left">{row.login}</TableCell>
                <TableCell align="left">{row.role}</TableCell>
                <TableCell align="left">
                  <IconButton color="primary" aria-label="upload picture" component="span" onClick={
                    () => {
                      dispatch(deleteUser(row._id))
                    }
                  }>
                    <DeleteIcon/>
                  </IconButton>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
/*


 */