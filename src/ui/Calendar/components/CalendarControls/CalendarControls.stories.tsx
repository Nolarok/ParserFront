import React from 'react'
import { storiesOf } from '@storybook/react'
import { text, withKnobs } from '@storybook/addon-knobs'
import { CalendarControls } from './CalendarControls'
import { action } from '@storybook/addon-actions'

const stories = storiesOf('CalendarControls', module)

stories.addDecorator(withKnobs)

stories.add('Default', () => {
  return (
    <div style={{ padding: 10 }}>
      <CalendarControls
        title={text('title', 'Сентябрь, 2018')}
        onBack={action('onBack')}
        onNext={action('onNext')}
        onAddEvent={action('onAddEvent')}
        onChangeDisplayType={action('onChangeDisplayType')}
        onToday={action('onToday')}
      />
    </div>
  )
})
