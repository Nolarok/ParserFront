import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { withKnobs, boolean, text } from '@storybook/addon-knobs'
import { Popup } from './Popup'

const stories = storiesOf('Popup', module)

stories.addDecorator(withKnobs)

stories.add('Popup', () => (
  <Popup
    isOpen={boolean('isOpen', true)}
    title={text('title', 'Заголовок')}
    onClose={action('onClose')}
  >
    {text('children', 'какой ни какой контент')}
  </Popup>
))
