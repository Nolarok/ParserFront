import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import { Countdown } from './Countdown'

const stories = storiesOf('Countdown', module)

stories.addDecorator(withKnobs)

stories.add('Countdown', () => <Countdown targetDate={new Date(12345671189011)} />)
