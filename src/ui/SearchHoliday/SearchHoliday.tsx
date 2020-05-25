import React from 'react'
import { block } from '@/helpers/bem'
import { SearchField } from '@/ui/SearchField'
import { Button, ButtonColor } from '@/ui/Button'
import group from './images/group.png'
import backgroundImage from './images/backgroundImage.png'
import css from './SearchHoliday.scss'

const b = block('searchHoliday', css)

type Props = {
  onSearch: () => void
  onCreateHoliday: () => void
  onChangeSearch: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const SearchHoliday: React.FC<Props> = props => {
  const { onSearch, onChangeSearch, onCreateHoliday } = props

  return (
    <>
      <img alt="backgroundImage" className={b('image')} src={group} />
      <div className={b('holidays')}>
        <h1 className={b('title')}>Создайте свой уникальный праздник</h1>
        <div className={b('description')}>
          Найдите всех исполнителей в одном месте. <br />
          Закажите и управляйте заказом в личном кабинете.
        </div>
        <div className={b('controls')}>
          <SearchField
            classContainer={b('search')}
            placeholder="Поиск по каталогу"
            onSearch={onSearch}
            onChange={onChangeSearch}
          />
          <Button className={b('button')} onClick={onCreateHoliday} color={ButtonColor.BLUE_DARK}>
            Создать свой праздник
          </Button>
        </div>
      </div>
      <img alt="backgroundImage" className={b('backgroundImage')} src={backgroundImage} />
    </>
  )
}
