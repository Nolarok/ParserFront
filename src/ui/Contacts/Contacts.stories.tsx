import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import { Contacts } from './Contacts'

const stories = storiesOf('Contacts', module)

stories.addDecorator(withKnobs)

stories.add('Contacts', () => (
  <div style={{ width: 440 }}>
    <Contacts
      items={[
        {
          title: 'Адрес',
          value: 'Москва, м. Алексеевская. пр. Мира, 102',
          onMapClick: () => {},
        },
        {
          title: 'Заказчик',
          value: 'Ксения Константинова',
        },
        {
          title: 'Телефон',
          value: '+7 (924) 425-41-45',
        },
      ]}
    />
  </div>
))
