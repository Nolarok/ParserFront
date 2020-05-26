import React, { useCallback, useEffect, useState } from 'react'
import { useFileUpload, useFileReader } from '@/helpers/hooks'
import { FileApi } from '@/api/file'
// import { Button } from '@/ui/Button'
import Button from '@material-ui/core/Button'


const Home: React.FC = () => {
  const [rowContent, setRowContent] = useState<string | null>(null)
  const [file, setFile] = useState<File| null>(null)

  const onFileAdd = useCallback((files: File[]) => {
    setFile(null)
    setRowContent(null)
    setFile(files[0])
  }, [])

  const {inputFile, handleOpenInputFile, handleAddFile, error} = useFileUpload(onFileAdd)
  const { readAsBinaryString, readAsText } = useFileReader()

  useEffect(() => {
    if (!file) {
      return
    }

    readAsText(file).then((data: string | ArrayBuffer | null) => {
      if (typeof data === 'string') {
        setRowContent(data)
        console.log({binaryFile: rowContent})
      }
    })
  }, [file])

  useCallback(() => {
    console.error(error)
  }, [error])

  return (
    <div>
      <Button variant="contained">Default</Button>
      <p>C:\Users\Ivan\WebstormProjects\parserFront\static\temp</p>
      <input
        onChange={handleAddFile}
        type="file"
        ref={inputFile}
        style={{display: 'none'}}
      />
      <Button
        onClick={() => { handleOpenInputFile() }}
      >
        Выбрать
      </Button>

      <Button
        disabled={!rowContent}
        onClick={() => {
          file && rowContent && FileApi.create({
            content: rowContent,
            mimeType: file.type
          })
        }}
      >
        Отправить
      </Button>
    </div>
  )
}

export default Home
