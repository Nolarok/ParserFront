import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, number, text } from '@storybook/addon-knobs'
import { RangeDropdown } from './RangeDropdown'
import { action } from '@storybook/addon-actions'

const story = storiesOf('RangeDropdown', module)

story.addDecorator(withKnobs)

story.add('default', () => {
  return (
    <RangeDropdown
      title={text('title', 'Бюджет')}
      min={number('min', 0)}
      step={number('step', 1)}
      max={number('max', 20000)}
      value={{ start: 0, end: 20000 }}
      defaultValue={{ start: 0, end: 20000 }}
      minRangeValue={number('minRangeValue', 2000)}
      maxRangeValue={number('maxRangeValue', 20000)}
      chartData={[3, 4, 4, 14, 35, 30, 41, 34, 41, 36, 34, 41, 30, 45, 36, 30, 11, 19, 14, 7, 3]}
      onChange={action('onChange')}
      onClose={action('onClose')}
    />
  )
})
