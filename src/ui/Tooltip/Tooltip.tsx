import React from 'react'
import css from './Tooltip.scss'
import { block as bemBlock } from '@/helpers/bem'

const b = bemBlock('tooltip', css)

export enum TooltipPlacement {
  TOP = 'top',
  LEFT = 'left',
  RIGHT = 'right',
  BOTTOM = 'bottom',
}

export enum TooltipCornerPosition {
  START = 'start',
  CENTER = 'center',
  END = 'end',
}

export enum TooltipTheme {
  DEFAULT = 'default',
  RED = 'red',
}

type Props = {
  content: string | React.ReactElement
  show?: boolean
  showOnHover?: boolean
  placement?: TooltipPlacement
  block?: boolean
  theme?: TooltipTheme
  cornerPosition?: TooltipCornerPosition
  showError?: boolean
}

export const Tooltip: React.FC<Props> = props => {
  const {
    children,
    content,
    placement = TooltipPlacement.BOTTOM,
    theme = TooltipTheme.DEFAULT,
    show,
    block,
    showOnHover,
    showError,
    cornerPosition = TooltipCornerPosition.START,
  } = props

  return (
    <div className={b({ show, block, showOnHover, theme, corner: cornerPosition, showError })}>
      {children}
      <div className={b('wrapper', { placement })}>{content}</div>
    </div>
  )
}
