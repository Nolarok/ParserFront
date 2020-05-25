import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, text } from '@storybook/addon-knobs'
import { DateField } from './DateField'
import { action } from '@storybook/addon-actions'

const stories = storiesOf('DateField', module)

stories.addDecorator(withKnobs)

stories.add('DateField', () => (
  <div style={{ width: 270 }}>
    <DateField
      onChange={action('onChange')}
      placeholder={text('placeholder', 'Выберите дату праздника')}
    />
  </div>
))
