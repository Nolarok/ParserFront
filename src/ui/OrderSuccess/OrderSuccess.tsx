import React from 'react'
import { block } from '@/helpers/bem'
import { Popup } from '@/ui/Popup'
import { Button, ButtonColor } from '@/ui/Button'
import { ButtonLink, ButtonLinkColor, ButtonLinkSize } from '@/ui/ButtonLink'
import { OrderStatus, Status } from '@/ui/OrderStatus'
import css from './OrderSuccess.scss'
import image from './assets/success.png'
import image2x from './assets/success@2x.png'

const b = block('orderSuccess', css)

type Props = {
  isOpen: boolean
  orderNumber: number
  orderLink: string
  catalogLink: string
  orderStatus: Status
  onClose: () => void
}

export const OrderSuccess: React.FC<Props> = props => {
  const { isOpen, orderNumber, orderLink, catalogLink, orderStatus, onClose } = props

  return (
    <Popup isOpen={isOpen} width={600} onClose={onClose}>
      <div className={b()}>
        <img
          className={b('image')}
          src={image}
          srcSet={`${image} 1x, ${image2x} 2x`}
          alt="успешная отправка заказа"
        />
        <h1 className={b('title')}>Заказ №{orderNumber} отправлен</h1>
        <div className={b('status')}>
          <div className={b('statusTitle')}>Статус заказа</div>
          <OrderStatus status={orderStatus} />
        </div>
        <p className={b('text')}>
          После подтверждения исполнителем заказа вам необходимо внести предоплату в течение 24
          часов в размере 10% от суммы заказа.
        </p>
        <p className={b('text')}>По истечению 24 часов происходит отмена заказа.</p>
        <div className={b('button')}>
          <Button href={orderLink} color={ButtonColor.RED}>
            перейти к заказу
          </Button>
        </div>
        <ButtonLink href={catalogLink} color={ButtonLinkColor.RED} size={ButtonLinkSize.SMALL}>
          Вернуться в каталог
        </ButtonLink>
      </div>
    </Popup>
  )
}
