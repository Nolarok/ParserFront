import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, boolean, select, text } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'
import { Checkbox, CheckboxTheme } from './Checkbox'

const stories = storiesOf('Checkbox', module)

stories.addDecorator(withKnobs)

stories.add('Checkbox', () => (
  <Checkbox
    onChange={action('onChange')}
    checked={boolean('checked', false)}
    name={text('name', '')}
    value={text('value', '')}
    theme={select('theme', CheckboxTheme, CheckboxTheme.DEFAULT)}
  >
    {text('Children', '')}
  </Checkbox>
))
