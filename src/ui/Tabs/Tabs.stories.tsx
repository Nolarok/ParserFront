import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'
import { IOption } from '@/types'
import { Tabs } from './Tabs'

const stories = storiesOf('tabs', module)

stories.addDecorator(withKnobs)

const tabs: IOption[] = [
  { value: '1', label: 'Дети 1-3 года' },
  { value: '2', label: 'Дети 3-6 лет' },
  { value: '3', label: 'Принцесса' },
  { value: '4', label: 'Снегурочка' },
  { value: '5', label: 'Свинка Пеппа' },
  { value: '6', label: 'Человек-паук' },
  { value: '7', label: 'Эксперименты' },
  { value: '8', label: 'Дискотека' },
]

stories.add('Default', () => {
  return (
    <div style={{ margin: 20, width: 800 }}>
      <Tabs active={tabs[0].value} tabs={tabs} onChange={action('onChange')} />
    </div>
  )
})
