import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, text } from '@storybook/addon-knobs'
import { ContentWrapper } from './ContentWrapper'
import { Container, ContainerSize } from '@/ui/Container'
import { action } from '@storybook/addon-actions'

const stories = storiesOf('ContentWrapper', module)

stories.addDecorator(withKnobs)

stories.add('ContentWrapper', () => {
  return (
    <div style={{ padding: '20px' }}>
      <Container size={ContainerSize.SMALL}>
        <ContentWrapper
          title={text('title', 'Образы')}
          subtitle={text('subtitle', '23')}
          searchLabel={text('searchLabel', 'Поиск по образам')}
          onSearch={action('onChange')}
        >
          {text('children', 'контент')}
        </ContentWrapper>
      </Container>
    </div>
  )
})
