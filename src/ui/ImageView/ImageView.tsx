import React from 'react'
import { Popup } from '@/ui/Popup'
import { block } from '@/helpers/bem'
import css from './ImageView.scss'

const b = block('imageView', css)

type Props = {
  isOpen: boolean
  onClose: () => void
  image: string
}

const ImageView: React.FC<Props> = props => {
  const { isOpen, onClose, image } = props

  return (
    <Popup isOpen={isOpen} onClose={onClose} className={b()}>
      <div className={b('wrapper')}>
        <img className={b('img')} src={image} />
      </div>
    </Popup>
  )
}

export default ImageView
