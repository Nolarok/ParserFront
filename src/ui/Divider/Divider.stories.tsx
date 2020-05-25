import { storiesOf } from '@storybook/react'
import { text, withKnobs } from '@storybook/addon-knobs'
import { Divider } from './Divider'
import React from 'react'

const stories = storiesOf('Divider', module)

stories.addDecorator(withKnobs)

stories.add('Default', () => {
  return <Divider title={text('title', 'Наши преимущества')} />
})
