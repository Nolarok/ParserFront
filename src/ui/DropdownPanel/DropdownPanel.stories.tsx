import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, boolean } from '@storybook/addon-knobs'
import { DropdownPanel } from './DropdownPanel'
import { action } from '@storybook/addon-actions'

const stories = storiesOf('DropdownPanel', module)

stories.addDecorator(withKnobs)

stories.add('text nodes', () => {
  return (
    <DropdownPanel
      open={boolean('open', true)}
      onClose={action('onClose')}
      button={<button>Click me</button>}
    >
      <div>DropdownPanel</div>
    </DropdownPanel>
  )
})
