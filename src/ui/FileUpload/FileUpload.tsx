import React from 'react'
import { block } from '@/helpers/bem'
import { Button, ButtonSize } from '@/ui/Button'
import css from './FileUpload.scss'
import { useFileUpload } from '@/helpers/hooks'
import { ALLOWED_EXTENSION } from '@/constants/file'

const b = block('fileLoading', css)

type Props = {
  onUploadFile: (files: File[]) => void
}

export const FileUpload: React.FC<Props> = props => {
  const { onUploadFile } = props

  const {
    inputFile,
    handleDrop,
    handleOpenInputFile,
    handleAddFile,
    handleDragOver,
  } = useFileUpload(onUploadFile)

  return (
    <div className={b()} onDrop={handleDrop} onDragOver={handleDragOver}>
      <span>Перетащите файлы, чтобы добавить новые фотографии и видео</span>
      <div className="upload-btn-wrapper">
        <Button onClick={handleOpenInputFile} size={ButtonSize.NORMAL} className={b('button')}>
          Загрузить
        </Button>
      </div>
      <input
        multiple
        onChange={handleAddFile}
        className={b('fileInput')}
        ref={inputFile}
        type="file"
        accept={ALLOWED_EXTENSION.join(',')}
      />
    </div>
  )
}
