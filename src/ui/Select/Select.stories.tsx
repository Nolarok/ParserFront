import React, { useState } from 'react'
import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/react'
import { boolean, text, withKnobs } from '@storybook/addon-knobs'
import { IOption } from '@/types'
import { Select } from './Select'
import { ValueType } from 'react-select/src/types'

const stories = storiesOf('Select', module)

stories.addDecorator(withKnobs)

const options: IOption[] = [
  { value: '1', label: 'Элемент 1' },
  { value: '2', label: 'Элемент 2' },
  { value: '3', label: 'Элемент 3' },
  { value: '4', label: 'Элемент 4' },
  { value: '5', label: 'Элемент 5' },
  { value: '6', label: 'Элемент 6' },
  { value: '7', label: 'Элемент 7' },
  { value: '8', label: 'Элемент 8' },
  { value: '9', label: 'Элемент 9' },
  { value: '10', label: 'Элемент 10' },
  { value: '11', label: 'Элемент 11' },
]

stories.add('Default', () => {
  const placeholder = text('placeholder', 'Выберите элемент')
  const onChange = action('onChange')
  const [value, setValue] = useState()
  const handleChange = (...args: [ValueType<IOption>]) => {
    setValue(args[0])
    onChange(...args)
  }

  return (
    <div style={{ width: '327px' }}>
      <Select
        isMulti={boolean('isMulti', false)}
        value={value}
        onChange={handleChange}
        options={options}
        placeholder={placeholder}
      />
    </div>
  )
})
