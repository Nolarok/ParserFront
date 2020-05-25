import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, select, boolean, text } from '@storybook/addon-knobs'
import { Tooltip, TooltipPlacement, TooltipTheme, TooltipCornerPosition } from './Tooltip'

const stories = storiesOf('Tooltip', module)

stories.addDecorator(withKnobs)

stories.add('Tooltip', () => (
  <div style={{ paddingLeft: '120px', paddingTop: '100px' }}>
    <Tooltip
      content={<div style={{ whiteSpace: 'nowrap' }}>{text('tooltipText', 'Добавить тэг')}</div>}
      show={boolean('show', true)}
      showOnHover={boolean('showOnHover', true)}
      block={boolean('block', false)}
      placement={select('placement', TooltipPlacement, TooltipPlacement.BOTTOM)}
      theme={select('theme', TooltipTheme, TooltipTheme.DEFAULT)}
      cornerPosition={select('cornerPosition', TooltipCornerPosition, TooltipCornerPosition.START)}
    >
      текст
    </Tooltip>
  </div>
))
