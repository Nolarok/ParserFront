import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, select } from '@storybook/addon-knobs'

import { OrderStatus, Status } from './OrderStatus'

const story = storiesOf('OrderStatus', module)

story.addDecorator(withKnobs)

story.add('OrderStatus', () => {
  return <OrderStatus status={select('status', Status, Status.EXPECTATION)} />
})
