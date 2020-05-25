import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, number, select } from '@storybook/addon-knobs'

import { Counter, CounterColor } from './Counter'

const story = storiesOf('Counter', module)

story.addDecorator(withKnobs)

story.add('Default red', () => {
  const count = number('Count', 7)

  return (
    <>
      <br />
      <Counter count={count}>
        <button>Test component</button>
      </Counter>
    </>
  )
})

story.add('black with positioning', () => {
  return (
    <>
      <br />
      <Counter count={number('Count', 55)} color={select('color', CounterColor, CounterColor.RED)}>
        <button>Test component</button>
      </Counter>
    </>
  )
})
