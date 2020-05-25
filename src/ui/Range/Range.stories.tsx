import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, boolean, number, select } from '@storybook/addon-knobs'
import { Range, RangeTheme } from './Range'

const stories = storiesOf('Range', module)

stories.addDecorator(withKnobs)

stories.add('Range', () => {
  const [value, setValue] = React.useState({ start: 0, end: 10 })

  return (
    <div style={{ width: '318px', margin: '100px' }}>
      <Range
        min={number('min', 0)}
        max={number('max', 10)}
        step={number('step', 1)}
        single={boolean('single', false)}
        theme={select('theme', RangeTheme, RangeTheme.DEFAULT)}
        value={value}
        minRangeValue={number('minRangeValue', 2)}
        maxRangeValue={number('maxRangeValue', 10)}
        chartData={[3, 4, 4, 14, 35, 30, 41, 34, 41, 36, 34, 41, 30, 45, 36, 30, 11, 19, 14, 7, 3]}
        onChange={setValue}
      />
    </div>
  )
})
