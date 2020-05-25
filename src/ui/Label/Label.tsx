import React from 'react'
import cn from 'classnames'
import css from './Label.scss'
import { block as bemBlock } from '@/helpers/bem'
import { Icon } from '@/ui/Icon'

const b = bemBlock('label', css)

export enum LabelTheme {
  DEFAULT = 'default',
  LIGHT_BLUE = 'lightBlue',
  BLUE = 'blue',
  RED = 'red',
  GREEN = 'green',
}

type Props = {
  className?: string
  onRemove?: (event: React.MouseEvent) => void
  theme?: LabelTheme
  showClose?: boolean
}

export const Label: React.FC<Props> = ({
  children,
  onRemove,
  className,
  theme = LabelTheme.DEFAULT,
  showClose,
}) => {
  const isRemovable = onRemove

  return (
    <div className={cn(b({ theme, showClose, isRemovable }), className)}>
      {children}
      {isRemovable && (
        <button type="button" className={b('close', { showClose })} onClick={onRemove}>
          <Icon
            icon={theme === LabelTheme.DEFAULT ? 'close-thin' : 'close'}
            className={b('icon')}
          />
        </button>
      )}
    </div>
  )
}
