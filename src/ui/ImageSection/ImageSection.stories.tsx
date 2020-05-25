import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import { ImageSection } from './ImageSection'
import banner from './images/banner.jpg'
import React from 'react'

const stories = storiesOf('ImageSection 2', module)

stories.addDecorator(withKnobs)

stories.add('Default', () => (
  <div style={{ margin: 20 }}>
    <ImageSection src={banner} label="Советы по оформлению мероприятия" />
  </div>
))
