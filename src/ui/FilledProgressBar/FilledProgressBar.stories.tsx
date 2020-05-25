import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import { FilledProgressBar } from './FilledProgressBar'

const data = {
  progress: 75,
  text: 'Заполните профиль',
}

const stories = storiesOf('FilledProgressBar', module)

stories.addDecorator(withKnobs)

stories.add('default', () => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      paddingTop: '20px',
    }}
  >
    <FilledProgressBar {...data} />
  </div>
))
