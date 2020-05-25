import React from 'react'
import { block } from '@/helpers/bem'
import { Icon } from '@/ui/Icon'
import css from './OrderStatus.scss'

const b = block('orderStatus', css)

export const orderStatusValues = {
  expectation: {
    text: 'Ожидает подтверждения',
    icon: 'question',
    width: 8,
  },
  expectationError: {
    text: 'Ожидание предоплаты',
    icon: 'check',
    width: 13,
  },
  prepaymentMade: {
    text: 'Внесена предоплата',
    icon: 'check',
    width: 13,
  },
  canceled: {
    text: 'Отменен',
    icon: 'close',
    width: 9,
  },
  done: {
    text: 'Завершен',
    icon: 'check',
    width: 13,
  },
}

export enum Status {
  EXPECTATION = 'expectation',
  EXPECTATION_ERROR = 'expectationError',
  PREPAYMENT_MADE = 'prepaymentMade',
  CANCELED = 'canceled',
  DONE = 'done',
}

type Props = {
  status: Status
}

export const OrderStatus: React.FC<Props> = props => {
  const { status } = props

  return (
    <div className={b({ status })}>
      <div className={b('circle')}>
        <Icon icon={orderStatusValues[status].icon} width={orderStatusValues[status].width} />
      </div>
      {orderStatusValues[status].text}
    </div>
  )
}
