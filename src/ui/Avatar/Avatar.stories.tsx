import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, select, boolean } from '@storybook/addon-knobs'
import { Avatar } from '@/ui/Avatar'
import { AvatarSize } from './Avatar'

const stories = storiesOf('Avatar', module)

stories.addDecorator(withKnobs)

stories.add('Avatar', () => (
  <Avatar
    size={select('size', AvatarSize, AvatarSize.NORMAL)}
    isSquared={boolean('isSquared', false)}
    image="https://via.placeholder.com/250"
  />
))
