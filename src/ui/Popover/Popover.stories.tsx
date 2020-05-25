import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, boolean, select } from '@storybook/addon-knobs'
import { Popover, PopoverPlacement } from './Popover'
import { action } from '@storybook/addon-actions'

const stories = storiesOf('Popover', module)

stories.addDecorator(withKnobs)

stories.add('image', () => {
  return (
    <div style={{ paddingLeft: '120px', paddingTop: '100px' }}>
      <Popover
        isOpen={boolean('isOpen', true)}
        onClose={action('onClose')}
        placement={select('placement', PopoverPlacement, PopoverPlacement.RIGHT)}
        content={<div style={{ width: '100px', height: '200px' }}>content</div>}
      >
        button
      </Popover>
    </div>
  )
})
