import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, boolean, text } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'
import { ConfirmPopup } from './ConfirmPopup'

const stories = storiesOf('ConfirmPopup', module)

stories.addDecorator(withKnobs)

stories.add('Default', () => {
  const isOpen = boolean('isOpen', true)
  const message = text('message', 'Вы хотите отказаться от заказа?')
  const cancelButtonText = text('cancelButtonText', 'Отказаться')
  const leaveButtonText = text('leaveButtonText', 'Нет, оставить')

  return (
    <ConfirmPopup
      isOpen={isOpen}
      message={message}
      applyButtonText={cancelButtonText}
      leaveButtonText={leaveButtonText}
      onApply={action('onApply')}
      onLeave={action('onLeave')}
    />
  )
})
