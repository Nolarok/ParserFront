import React from 'react'
import { block } from '@/helpers/bem'
import { ButtonLinkColor, ButtonLink, ButtonLinkSize } from '@/ui/ButtonLink'
import { Icon } from '@/ui/Icon'
import css from './Contacts.scss'

const b = block('contacts', css)

export type ContactItem = {
  title: string
  value: string
  onMapClick?: () => void
}

type Props = {
  items: ContactItem[]
}

export const Contacts: React.FC<Props> = props => {
  const { items } = props

  return (
    <div>
      {items.map((item, index) => (
        <div key={index} className={b('item')}>
          <div className={b('title')}>{item.title}</div>
          <div>
            {item.value}
            {item.onMapClick && (
              <div className={b('mapLink')}>
                <ButtonLink
                  color={ButtonLinkColor.BLUE}
                  size={ButtonLinkSize.EXTRA_SMALL}
                  dashed
                  onClick={item.onMapClick}
                  icon={<Icon icon="map" width={12} />}
                >
                  Смотреть на карте
                </ButtonLink>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
