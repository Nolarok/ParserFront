import React, { useCallback, useEffect, useRef, useState } from 'react'
import { checkFile, TFileError } from '@/ui/FileUpload/utils'
// const objectFitImages = require('object-fit-images')
//
// export const useObjectFitImagesPolyfill = (dependence: any = null) => {
//   useEffect(() => {
//     objectFitImages()
//   }, [dependence])
// }

export const useFileReader = () => {
  enum readerFunctions {
    readAsArrayBuffer = 'readAsArrayBuffer',
    readAsDataURL = 'readAsDataURL',
    readAsBinaryString = 'readAsBinaryString',
    readAsText = 'readAsText',
  }

  const readFile = (file: File, readerFunction: readerFunctions): Promise<string | ArrayBuffer | null> => {
    return new Promise(resolve => {
      const fileReader = new FileReader()
      fileReader.onload = function() {
        resolve(fileReader.result)
      }

      fileReader[readerFunction](file)
    })
  }

  const readAsArrayBuffer = (file: File) => readFile(file, readerFunctions.readAsArrayBuffer)
  const readAsDataURL = (file: File) => readFile(file, readerFunctions.readAsDataURL)
  const readAsBinaryString = (file: File) => readFile(file, readerFunctions.readAsBinaryString)
  const readAsText = (file: File) => readFile(file, readerFunctions.readAsText)

  return {
    readFile,
    readAsArrayBuffer,
    readAsDataURL,
    readAsBinaryString,
    readAsText,
  }
}

export const useToggle = (initialValue = false): [boolean, () => void] => {
  const [value, setValue] = useState<boolean>(initialValue)

  const toggle = useCallback(() => {
    setValue(!value)
  }, [value, setValue])

  return [value, toggle]
}

export const useTextAreaChangeAdapter = <T>(
  onChange: (name: T, value: string) => void,
  name: T
) => {
  return useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      const { value } = event.target

      onChange(name, value)
    },
    [name, onChange]
  )
}

export const useFileUpload = (onAddFiles: (files: File[]) => void) => {
  const inputFile = useRef<HTMLInputElement>(null)

  const [error, setError] = useState<TFileError | null>(null)

  const setFileList = useCallback(
    (fileList: FileList) => {
      const files = Array.from(fileList)

      if (files.length) {
        const isFilesValid = files.every(file => {
          const checkResult = checkFile(file)
          console.log(checkResult)
          if (checkResult !== true) {
            console.error(checkResult)
            setError(checkResult)
            return false
          }

          return true
        })

        if (!isFilesValid) {
          console.error('File is not valid')
          return
        }

        if (inputFile.current) {
          inputFile.current.files = fileList
        }

        setError(null)
        onAddFiles(files)
      }
    },
    [onAddFiles]
  )

  const handleDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault()
      setFileList(event.dataTransfer.files)
    },
    [setFileList]
  )

  const handleAddFile = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      console.log('handleAddFile')
      const newFiles = event.target.files

      if (newFiles) {
        setFileList(newFiles)
      }
    },
    [setFileList]
  )

  const handleOpenInputFile = useCallback(() => {
    if (inputFile.current) {
      inputFile.current.click()
    }
  }, [])

  const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
  }, [])

  const handleReset = useCallback(() => {
    if (inputFile.current) {
      inputFile.current.value = ''
    }
    onAddFiles([])
    setError(null)
  }, [onAddFiles])

  return {
    inputFile,
    handleAddFile,
    handleDrop,
    handleOpenInputFile,
    handleDragOver,
    handleReset,
    error,
    setError,
  }
}
