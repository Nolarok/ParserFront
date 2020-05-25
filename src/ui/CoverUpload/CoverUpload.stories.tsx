import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'
import { CoverUpload } from './CoverUpload'

const stories = storiesOf('CoverUpload', module)

stories.addDecorator(withKnobs)

stories.add('CoverUpload', () => {
  return <CoverUpload onChangeImage={action('onChangeImage')} />
})
