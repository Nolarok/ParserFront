import React from 'react'
import { storiesOf } from '@storybook/react'
import { number, select, text, withKnobs } from '@storybook/addon-knobs'
import { CalendarCard, CardTheme } from './CalendarCard'
import { Icon } from '@/ui/Icon'

const stories = storiesOf('CalendarCard', module)

stories.addDecorator(withKnobs)

stories.add('Default', () => {
  return (
    <div style={{ padding: 10 }}>
      <CalendarCard
        theme={select('Theme', CardTheme, CardTheme.BASIC)}
        height={number('height', 171)}
        renderIcon={className => <Icon className={className} icon="type-event-show" width={17} />}
        title={text('title', '13:00 – 16:00')}
        text={
          <>
            Москва, м.
            <br />
            Алексеевская. пр.
            <br />
            Мира, 102
          </>
        }
      />
    </div>
  )
})
