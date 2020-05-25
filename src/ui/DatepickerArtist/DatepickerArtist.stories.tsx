import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'

import { DatepickerArtist } from './DatepickerArtist'

const story = storiesOf('DatepickerArtist', module)

story.addDecorator(withKnobs)

const availabe = [
  new Date(2019, 8, 11),
  new Date(2019, 9, 17),
  new Date(2019, 9, 21),
  new Date(2019, 9, 1),
  new Date(2019, 10, 5),
]

const availablePartially = [
  new Date(2019, 8, 15),
  new Date(2019, 9, 4),
  new Date(2019, 9, 5),
  new Date(2019, 9, 25),
  new Date(2019, 10, 7),
]

const notAvailable = [
  new Date(2019, 8, 23),
  new Date(2019, 9, 2),
  new Date(2019, 9, 9),
  new Date(2019, 9, 16),
  new Date(2019, 10, 18),
]

story.add('default', () => {
  return (
    <DatepickerArtist
      available={availabe}
      availablePartially={availablePartially}
      notAvailable={notAvailable}
      onSubmit={action('onSubmit')}
    />
  )
})
