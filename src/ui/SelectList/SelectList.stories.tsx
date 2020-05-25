import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { withKnobs } from '@storybook/addon-knobs'
import { data } from './mock'
import { SelectList } from './SelectList'

const dataNodes = [
  {
    id: '1',
    content: <div>Московская область</div>,
  },
  {
    id: '2',
    content: <div>Ленинградская область</div>,
  },
  {
    id: '3',
    content: <div>Белгородская область</div>,
  },
]

const stories = storiesOf('SelectList', module)

stories.addDecorator(withKnobs)

const onSelect = action('onSelect')

stories.add('text nodes', () => {
  return <SelectList items={data} onSelect={onSelect} />
})

stories.add('react nodes', () => {
  return <SelectList items={dataNodes} onSelect={onSelect} />
})
