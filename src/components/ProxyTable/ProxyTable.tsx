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

import {proxySelector} from '@/store/proxy/selectors'
import {createProxy, deleteProxy, getProxyList} from '@/store/proxy/actions'
import DeleteIcon from "@material-ui/icons/Delete"
import IconButton from "@material-ui/core/IconButton"

type Props = {}

export const ProxyTable: React.FC<Props> = () => {
  const dispatch = useDispatch()
  const rows = useSelector(proxySelector) || []

  console.log({rows})

  useEffect(() => {
    dispatch(getProxyList())
  }, [])

  return (
    <TableContainer component={Paper}>
      <Table component={'table'} aria-label="collapsible table">
        <TableHead component={'thead'}>
          <TableRow component={'tr'}>
            <TableCell align="left">Хост</TableCell>
            <TableCell align="left">Порт</TableCell>
            <TableCell align="left">Логин</TableCell>
            <TableCell align="left">Пароль</TableCell>
            <TableCell/>
          </TableRow>
        </TableHead>
        <TableBody component={'tbody'}>
          {rows.map((row) => {
            return (
              <TableRow key={row._id} component={'tr'}>
                <TableCell align="left">{row.host}</TableCell>
                <TableCell align="left">{row.port}</TableCell>
                <TableCell align="left">{row.login}</TableCell>
                <TableCell align="left">{row.password}</TableCell>
                <TableCell align="left">
                  <IconButton color="primary" aria-label="upload picture" component="span" onClick={
                    () => {
                      dispatch(deleteProxy(row._id))
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