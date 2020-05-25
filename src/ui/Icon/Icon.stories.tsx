import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import { Icon } from './Icon'

const stories = storiesOf('Icon', module)

stories.addDecorator(withKnobs)
const icons = require.context('./icons/', true, /\.svg$/)

stories.add('Icon', () => (
  <div style={{ display: 'flex', flexWrap: 'wrap' }}>
    {icons.keys().map((icon: string) => (
      <div
        key={icon}
        style={{
          width: '130px',
          border: '1px solid #000',
          margin: '5px',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Icon icon={icon.slice(2, -4)} width={60} />
        <div style={{ paddingTop: '15px', textAlign: 'center' }}>{icon.slice(2, -4)}</div>
      </div>
    ))}
  </div>
))
