import React, { useCallback, useEffect, useState } from 'react'
import { useFileUpload, useFileReader } from '@/helpers/hooks'
import {withStyles, Theme, makeStyles, createStyles} from '@material-ui/core/styles'
import { createFile, setError } from '@/store/file/actions'
import Tooltip from '@material-ui/core/Tooltip'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'

import { useDispatch } from 'react-redux'

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      fileUploadWrapper: {
        display: 'flex',
        alignItems: 'center',
      },
      fileUploadHelp: {
        borderRadius: 8,
        background: '#ffffff',
        padding: 10,
        marginLeft: 20,
        border: '1px solid rgba(0,0,0, .3)'
      }
    })
)

export const FileLoader: React.FC = () => {
  const classes = useStyles()
  const [rowContent, setRowContent] = useState<string | null>(null)
  const [file, setFile] = useState<File | null>(null)

  const onFileAdd = useCallback((files: File[]) => {
    setFile(null)
    setRowContent(null)
    setFile(files[0])
  }, [])

  const { inputFile, handleOpenInputFile, handleAddFile, error } = useFileUpload(onFileAdd)
  const { readAsDataURL } = useFileReader()
  const dispatch = useDispatch()

  useEffect(() => {
    if (!file) {
      return
    }

    readAsDataURL(file).then((data: string | ArrayBuffer | null) => {
      if (typeof data === 'string') {
        setRowContent(data)
      }
    })
  }, [file])

  useEffect(() => {
    file && rowContent && dispatch(createFile({
      content: rowContent,
      filename: file.name,
    }))
  }, [rowContent])

  useEffect(() => {
    if (error && error.type) {
      dispatch(setError([{ message: 'Загрузка файла: Некорректный формат файла' }]))
    }
  }, [error])

  const tooltipContent = (
    <ul className={classes.fileUploadHelp}>
      <li> <b>Поиск по Ф.И.О.:</b> Файл должен содержать столбцы "Имя", "Фамилия", "Отчество", "Дата". </li>
      <li> <b>Поиск по ИП:</b> Файл должен содержать столбец "Номер ИП". </li>
    </ul>
  )

  return (
    <div className={classes.fileUploadWrapper}>
      <input
        onChange={handleAddFile}
        type="file"
        ref={inputFile}
        style={{ display: 'none' }}
      />
        <Fab color="primary" aria-label="add" onClick={
          () => { handleOpenInputFile() }
        }>
          <AddIcon/>
        </Fab>
      {tooltipContent}
    </div>
  )
}
