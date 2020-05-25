import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, boolean } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'
import { LabelCheckbox } from './LabelCheckbox'

const onClick = action('onClick')

const stories = storiesOf('LabelCheckbox', module)

stories.addDecorator(withKnobs)

stories.add('default', () => (
  <LabelCheckbox
    title="Музыкальное оборудование"
    onClick={onClick}
    checked={boolean('checked', false)}
  />
))

stories.add('checked', () => (
  <LabelCheckbox
    title="Музыкальное оборудование"
    onClick={onClick}
    checked={boolean('checked', true)}
  />
))
