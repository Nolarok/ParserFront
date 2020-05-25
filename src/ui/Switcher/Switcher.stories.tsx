import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, text, boolean } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'
import { Switcher } from './Switcher'

const stories = storiesOf('Switcher', module)

stories.addDecorator(withKnobs)

stories.add('Switcher', () => {
  return (
    <div style={{ padding: '20px' }}>
      <Switcher checked={boolean('checked', false)} onChange={action('onChange')}>
        {text('children', 'asd')}
      </Switcher>
    </div>
  )
})
