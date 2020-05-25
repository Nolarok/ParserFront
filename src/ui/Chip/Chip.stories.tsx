import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, boolean, text, select } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'
import { Chip, ChipTheme } from './Chip'

const stories = storiesOf('Chip', module)

stories.addDecorator(withKnobs)

stories.add('Default', () => {
  const onChange = action('onChange')
  const checked = boolean('checked', false)
  const value = text('value', 'Пример')
  const children = text('children', 'Пример')

  return (
    <Chip
      value={value}
      onChange={onChange}
      theme={select('theme', ChipTheme, ChipTheme.RED)}
      checked={checked}
    >
      {children}
    </Chip>
  )
})
