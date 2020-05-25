import React from 'react'
import css from './FilledProgressBar.scss'
import { block } from '@/helpers/bem'
import icon from './images/icon.jpg'
import icon2x from './images/icon@2x.jpg'

const b = block('filledProgressBar', css)

type Props = {
  progress: number
  text: string
}

export const FilledProgressBar: React.FC<Props> = props => {
  const { progress, text } = props

  return (
    <div className={b()}>
      <div className={b('iconWrap')}>
        <img src={icon} srcSet={`${icon} 1x, ${icon2x} 2x`} />
      </div>
      <div>
        <div className={b('topWrap')}>
          <div className={b('textLabel')}>{text}</div>
          <div className={b('percents')}>{progress}%</div>
        </div>
        <div className={b('progress')}>
          <div className={b('progressBar')} style={{ width: `${progress}%` }}></div>
        </div>
      </div>
    </div>
  )
}
