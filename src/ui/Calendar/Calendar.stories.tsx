import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import { Calendar } from './Calendar'

const stories = storiesOf('Calendar', module)

stories.addDecorator(withKnobs)

stories.add('Default', () => {
  return (
    <div style={{ backgroundColor: '#f5f8fc', padding: 10 }}>
      <div style={{ width: 1010 }}>
        <Calendar getCardsByCell={() => []} />
      </div>
    </div>
  )
})
