import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, text, number, select, boolean } from '@storybook/addon-knobs'
import { Status } from '@/ui/OrderStatus'
import { OrderSuccess } from './OrderSuccess'
import { action } from '@storybook/addon-actions'

const story = storiesOf('OrderSuccess', module)

story.addDecorator(withKnobs)

story.add('OrderSuccess', () => {
  return (
    <OrderSuccess
      isOpen={boolean('isOpen', true)}
      orderLink={text('orderLink', '/')}
      catalogLink={text('catalogLink', '/')}
      orderStatus={select('status', Status, Status.EXPECTATION)}
      orderNumber={number('orderNumber', 237)}
      onClose={action('onClose')}
    />
  )
})
