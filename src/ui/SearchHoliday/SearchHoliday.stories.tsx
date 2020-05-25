import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { withKnobs } from '@storybook/addon-knobs'
import { SearchHoliday } from './SearchHoliday'

const stories = storiesOf('SearchHoliday', module)

stories.addDecorator(withKnobs)

stories.add('default', () => {
  const onChangeSearch = action('onChangeSearch')
  const onCreateHoliday = action('onCreateHoliday')
  const onSearch = action('onSearch')

  return (
    <SearchHoliday
      onChangeSearch={onChangeSearch}
      onCreateHoliday={onCreateHoliday}
      onSearch={onSearch}
    />
  )
})
