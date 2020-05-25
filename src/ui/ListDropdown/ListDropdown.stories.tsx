import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, text } from '@storybook/addon-knobs'
import { ListDropdown } from './ListDropdown'
import { action } from '@storybook/addon-actions'

const story = storiesOf('ListDropdown', module)

story.addDecorator(withKnobs)

const dataNodes = [
  {
    id: '1',
    content: 'Московская область',
  },
  {
    id: '2',
    content: 'Ленинградская область',
  },
  {
    id: '3',
    content: 'Белгородская область',
  },
]

story.add('default', () => {
  return (
    <ListDropdown
      title={text('title', 'Место')}
      items={dataNodes}
      selectedIds={[]}
      onChange={action('onChange')}
      onClose={action('onClose')}
    />
  )
})
