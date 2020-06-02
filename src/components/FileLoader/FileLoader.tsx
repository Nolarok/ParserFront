import React, { useCallback, useEffect, useState } from 'react'
import { useFileUpload, useFileReader } from '@/helpers/hooks'
import { createFile, setError } from '@/store/file/actions'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'

import { useDispatch } from 'react-redux'

export const FileLoader: React.FC = () => {
  const [rowContent, setRowContent] = useState<string | null>(null)
  const [file, setFile] = useState<File| null>(null)

  const onFileAdd = useCallback((files: File[]) => {
    setFile(null)
    setRowContent(null)
    setFile(files[0])
  }, [])

  const {inputFile, handleOpenInputFile, handleAddFile, error} = useFileUpload(onFileAdd)
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
    if(error && error.type) {
      dispatch(setError([{message: 'Загрузка файла: Некорректный формат файла'}]))
    }
  }, [error])

  return (
    <div>
      <input
        onChange={handleAddFile}
        type="file"
        ref={inputFile}
        style={{display: 'none'}}
      />

      {/*<Typography component="span" > Добавить файл: </Typography>*/}
      <Fab color="primary" aria-label="add" onClick={
        () => { handleOpenInputFile() }
      }>
        <AddIcon />
      </Fab>
    </div>
  )
}
