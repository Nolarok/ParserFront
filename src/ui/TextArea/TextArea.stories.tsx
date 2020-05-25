import React, { CSSProperties } from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'
import { TextArea } from '@/ui/TextArea'

const stories = storiesOf('TextArea', module)

stories.addDecorator(withKnobs)

const stylesWrapper: CSSProperties = {
  display: 'inline-block',
  border: 'none',
  width: '330px',
}

const onChange = action('onChange')

stories.add('default', () => {
  return (
    <div style={stylesWrapper}>
      <TextArea onChange={onChange} />
    </div>
  )
})
