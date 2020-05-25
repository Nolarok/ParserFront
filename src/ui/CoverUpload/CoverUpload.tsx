import React, { useCallback, useState } from 'react'
import { block } from '@/helpers/bem'
import { Button, ButtonColor } from '@/ui/Button'
import { ALLOWED_EXTENSION } from '@/constants/file'
import { createObjectURL } from '@/helpers/file'
import { useFileUpload } from '@/helpers/hooks'
import css from './CoverUpload.scss'

const b = block('coverUpload', css)

type Props = {
  defaultImage?: string
  onChangeImage: (file: File | null) => void
}

export const CoverUpload: React.FC<Props> = props => {
  const { onChangeImage, defaultImage } = props
  const [image, setImage] = useState<File | null>()
  const [isChanged, setIsChanged] = useState<boolean>(false)

  const handleChangeImage = useCallback(
    (files: File[] | null) => {
      if (files) {
        const file = files[0]

        setImage(file)
        onChangeImage(file)
      } else {
        onChangeImage(null)
        setImage(null)
      }
      setIsChanged(true)
    },
    [onChangeImage]
  )
  const { inputFile, handleOpenInputFile, handleReset, handleAddFile } = useFileUpload(
    handleChangeImage
  )

  const displayImage = createObjectURL(image)

  return (
    <div className={b()}>
      {displayImage || (!isChanged && defaultImage) ? (
        <div className={b('container')}>
          <img className={b('image')} alt="cover image" src={displayImage || defaultImage} />
          <div className={b('buttons')}>
            <Button onClick={handleOpenInputFile} className={b('button')}>
              Заменить
            </Button>
            <Button onClick={handleReset} color={ButtonColor.RED} className={b('button')}>
              Удалить
            </Button>
          </div>
        </div>
      ) : (
        <>
          <div className={b('description')}>Добавить обложку профиля, чтобы сделать его ярче</div>
          <Button onClick={handleOpenInputFile}>Загрузить</Button>
        </>
      )}

      <input
        onChange={handleAddFile}
        className={b('fileInput')}
        ref={inputFile}
        type="file"
        accept={ALLOWED_EXTENSION.join(',')}
      />
    </div>
  )
}
