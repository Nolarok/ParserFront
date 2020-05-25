import React, { useState } from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { withKnobs } from '@storybook/addon-knobs'
import { FileUpload } from './FileUpload'

const stories = storiesOf('FileUpload', module)

stories.addDecorator(withKnobs)

stories.add('Default', () => {
  const onUploadFile = action('onUploadFile')
  const [files, setFile] = useState<File[]>([])

  const handleUploadFile = (files: File[]) => {
    onUploadFile(files)
    setFile(files)
  }

  return (
    <div>
      <FileUpload onUploadFile={handleUploadFile} />
      <ul>
        {files.map((file, index) => (
          <li key={file.name + index}>{`${file.name} (${file.type})`}</li>
        ))}
      </ul>
    </div>
  )
})
