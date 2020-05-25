import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, select } from '@storybook/addon-knobs'
import { Container, ContainerSize } from './Container'

const stories = storiesOf('Container', module)

stories.addDecorator(withKnobs)

stories.add('Container', () => (
  <Container size={select('size', ContainerSize, ContainerSize.MEDIUM)}>
    Просто ограничивает ширину контента
  </Container>
))
