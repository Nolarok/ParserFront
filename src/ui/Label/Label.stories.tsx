import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, text } from '@storybook/addon-knobs'
import { Label, LabelTheme } from './Label'
import { action } from '@storybook/addon-actions'

const stories = storiesOf('Label', module)

stories.addDecorator(withKnobs)

stories.add('Default', () => (
  <div style={{ paddingLeft: '120px', paddingTop: '100px' }}>
    <Label onRemove={action('onRemove')}>{text('children', 'Человек-Паук')}</Label>
  </div>
))

stories.add('LightBlue', () => (
  <div style={{ paddingLeft: '120px', paddingTop: '100px' }}>
    <Label onRemove={action('onRemove')} theme={LabelTheme.LIGHT_BLUE}>
      {text('children', 'Активные игры')}
    </Label>
  </div>
))

stories.add('Blue', () => (
  <div style={{ paddingLeft: '120px', paddingTop: '100px' }}>
    <Label onRemove={action('onRemove')} theme={LabelTheme.BLUE}>
      {text('children', 'Фокусы')}
    </Label>
  </div>
))

stories.add('Red', () => (
  <div style={{ paddingLeft: '120px', paddingTop: '100px' }}>
    <Label onRemove={action('onRemove')} theme={LabelTheme.RED}>
      {text('children', 'Спектакль')}
    </Label>
  </div>
))

stories.add('Green', () => (
  <div style={{ paddingLeft: '120px', paddingTop: '100px' }}>
    <Label onRemove={action('onRemove')} theme={LabelTheme.GREEN}>
      {text('children', 'Спектакль')}
    </Label>
  </div>
))
