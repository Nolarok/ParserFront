import React, { useCallback, useEffect, useState } from 'react'
import { useFileUpload, useFileReader } from '@/helpers/hooks'
import { withStyles, Theme, makeStyles } from '@material-ui/core/styles'
import { createFile, setError } from '@/store/file/actions'
import Tooltip from '@material-ui/core/Tooltip'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'

import { useDispatch } from 'react-redux'

const HtmlTooltip = withStyles((theme: Theme) => ({
  tooltip: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',

    '& li:not(:first-child)': {
      marginTop: 20,
    }
  },
}))(Tooltip);

export const FileLoader: React.FC = () => {
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
    <ul>
      <li> <b>Поиск по Ф.И.О.:</b> Файл должен содержать столбцы "Имя", "Фамилия", "Дата". </li>
      <li> <b>Поиск по ИП:</b> Файл должен содержать стобик "Номер ИП". </li>
    </ul>
  )

  return (
    <div>
      <input
        onChange={handleAddFile}
        type="file"
        ref={inputFile}
        style={{ display: 'none' }}
      />

      <HtmlTooltip
        title={tooltipContent}
        aria-label={'sdd'}
        placement="right"
      >
        <Fab color="primary" aria-label="add" onClick={
          () => { handleOpenInputFile() }
        }>
          <AddIcon/>
        </Fab>
      </HtmlTooltip>
    </div>
  )
}
