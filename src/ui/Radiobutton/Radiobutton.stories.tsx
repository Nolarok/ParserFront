import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, boolean, select, text } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'
import { Radiobutton, RadiobuttonTheme } from './Radiobutton'

const stories = storiesOf('Radiobutton', module)

stories.addDecorator(withKnobs)

stories.add('Radiobutton', () => (
  <Radiobutton
    onChange={action('onChange')}
    checked={boolean('checked', false)}
    name={text('name', '')}
    value={text('value', '')}
    theme={select('theme', RadiobuttonTheme, RadiobuttonTheme.DEFAULT)}
  >
    {text('children', '')}
  </Radiobutton>
))
