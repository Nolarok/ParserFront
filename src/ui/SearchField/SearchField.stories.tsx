import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'
import { SearchField } from './SearchField'

const onChange = action('onChange')
const onSearch = action('onSearch')

const stories = storiesOf('SearchField', module)

stories.addDecorator(withKnobs)

stories.add('SearchField', () => (
  <SearchField placeholder="Поиск по каталогу" onChange={onChange} onSearch={onSearch} />
))
