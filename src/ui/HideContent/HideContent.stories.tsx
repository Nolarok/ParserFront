import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import { Label, LabelTheme } from '@/ui/Label'
import { HideContent } from './HideContent'
import React from 'react'
import { action } from '@storybook/addon-actions'

const stories = storiesOf('HideContent', module)

stories.addDecorator(withKnobs)

stories.add('HideContent', () => {
  const onRemove = action('onRemove')

  return (
    <div style={{ margin: 20, width: 700 }}>
      <HideContent
        show={8}
        countWords={{
          single: 'услуга',
          few: 'услуги',
          many: 'услуг',
        }}
      >
        <Label theme={LabelTheme.BLUE} showClose onRemove={onRemove}>
          Фокусы
        </Label>
        <Label theme={LabelTheme.BLUE} showClose onRemove={onRemove}>
          Эксперименты
        </Label>
        <Label theme={LabelTheme.BLUE} showClose onRemove={onRemove}>
          Дискотека
        </Label>
        <Label theme={LabelTheme.BLUE} showClose onRemove={onRemove}>
          Спортивная вечеринка
        </Label>
        <Label theme={LabelTheme.BLUE} showClose onRemove={onRemove}>
          Танцы
        </Label>
        <Label theme={LabelTheme.BLUE} showClose onRemove={onRemove}>
          Кукольный театр
        </Label>
        <Label theme={LabelTheme.BLUE} showClose onRemove={onRemove}>
          Спектакль
        </Label>
        <Label theme={LabelTheme.BLUE} showClose onRemove={onRemove}>
          Поздравление с днем рождения
        </Label>
        <Label theme={LabelTheme.BLUE} showClose onRemove={onRemove}>
          Спортивная вечеринка
        </Label>
        <Label theme={LabelTheme.BLUE} showClose onRemove={onRemove}>
          Танцы
        </Label>
        <Label theme={LabelTheme.BLUE} showClose onRemove={onRemove}>
          Кукольный театр
        </Label>
        <Label theme={LabelTheme.BLUE} showClose onRemove={onRemove}>
          Спектакль
        </Label>
      </HideContent>
    </div>
  )
})
