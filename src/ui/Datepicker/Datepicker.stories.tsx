import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, select } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'

import { Datepicker, DatepickerThemes } from './Datepicker'

const story = storiesOf('Datepicker', module)

story.addDecorator(withKnobs)

story.add('default', () => {
  const theme = select('Theme', DatepickerThemes, DatepickerThemes.SIMPLE)

  return <Datepicker theme={theme} onSelect={action('onSelect')} />
})
