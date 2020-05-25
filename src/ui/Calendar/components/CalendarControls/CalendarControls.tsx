import React from 'react'
import cn from 'classnames'
import { ValueType } from 'react-select/src/types'
import { block } from '@/helpers/bem'
import { Button, ButtonSize, ButtonTheme } from '@/ui/Button'
import { Select } from '@/ui/Select'
import { IOption } from '@/types'
import { Icon } from '@/ui/Icon'
import css from './CalendarControls.scss'

const b = block('container', css)

type Props = {
  title: string
  className?: string
  onNext: () => void
  onBack: () => void
  onToday: () => void
  onAddEvent: () => void
  onChangeDisplayType: (value: ValueType<IOption>, id?: string) => void
}

export const CalendarControls: React.FC<Props> = props => {
  const { onNext, onBack, onToday, title, className, onAddEvent, onChangeDisplayType } = props

  const options: IOption[] = [
    { value: 'День', label: 'День' },
    { value: 'Неделя', label: 'Неделя' },
    { value: 'Месяц', label: 'Месяц' },
  ]

  return (
    <div className={b()}>
      <Button onClick={onBack} className={cn(className, b('back'))} size={ButtonSize.LITTLE}>
        <Icon icon="chevrone" rotate={180} width={7} />
      </Button>
      <Button onClick={onNext} className={b('next')} size={ButtonSize.LITTLE}>
        <Icon icon="chevrone" width={7} />
      </Button>
      <Button
        onClick={onToday}
        className={b('today')}
        theme={ButtonTheme.THIN}
        size={ButtonSize.LITTLE}
      >
        Сегодня
      </Button>
      <div className={b('title')}>{title}</div>
      <Button
        onClick={onAddEvent}
        className={b('addEvent')}
        theme={ButtonTheme.THIN}
        size={ButtonSize.LITTLE}
      >
        Добавить событие
      </Button>
      <Select
        className={b('displayType')}
        value={options[1]}
        options={options}
        onChange={onChangeDisplayType}
      />
    </div>
  )
}
