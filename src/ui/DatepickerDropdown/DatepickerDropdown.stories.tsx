import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, text } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'
import { DatepickerDropdown } from './DatepickerDropdown'

const story = storiesOf('DatepickerDropdown', module)

story.addDecorator(withKnobs)

story.add('default', () => {
  const date = new Date()

  return (
    <DatepickerDropdown
      date={date}
      title={text('title', 'Даты проведения')}
      onSelect={action('onSelect')}
      onClose={action('onClose')}
    />
  )
})
