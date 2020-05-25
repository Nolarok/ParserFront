import React, { CSSProperties } from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, text, select } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'
import { TextField, TextFieldTheme } from './TextField'

const postfixStyle: CSSProperties = {
  paddingRight: 10,
}

const onChange = action('onChange')

const stories = storiesOf('TextField', module)

stories.addDecorator(withKnobs)

stories.add('TextField', () => (
  <div style={{ padding: '30px', width: '360px' }}>
    <TextField
      placeholder={text('label', 'Введите название компании')}
      theme={select('theme', TextFieldTheme, TextFieldTheme.DEFAULT)}
      onChange={onChange}
      renderPostfix={<div style={postfixStyle}>{text('postfix', 'Postfix')}</div>}
    />
  </div>
))
