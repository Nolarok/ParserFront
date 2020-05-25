import React from 'react'
import { DropdownPanel } from '@/ui/DropdownPanel'
import { block } from '@/helpers/bem'
import { Range, RangeTheme, RangeBorders } from '@/ui/Range'
import { Button, ButtonSize, ButtonTheme, ButtonColor } from '@/ui/Button'
import { spaceDigits } from '@/helpers/number'
import css from './RangeDropdown.scss'

const b = block('rangeDropdown', css)

type Props = {
  title: string
  className?: string
  children?: React.ReactNode
  min: number
  max: number
  step: number
  value: RangeBorders
  defaultValue: RangeBorders
  minRangeValue: number
  maxRangeValue: number
  chartData?: number[]
  onChange: (value: RangeBorders) => void
  onClose: () => void
}

export const RangeDropdown: React.FC<Props> = props => {
  const {
    min,
    max,
    step,
    value,
    defaultValue,
    minRangeValue,
    maxRangeValue,
    chartData,
    onClose,
    title,
    className,
    onChange,
  } = props

  const [open, setOpen] = React.useState(false)

  const handleClose = React.useCallback(() => {
    setOpen(false)
    onClose()
  }, [onClose, setOpen])

  const handleToggle = React.useCallback(() => {
    if (open) {
      onClose()
    }
    setOpen(!open)
  }, [open, onClose, setOpen])

  const isDefault = React.useMemo(
    () => value.start === defaultValue.start && value.end === defaultValue.end,
    [value, defaultValue]
  )

  return (
    <DropdownPanel
      open={open}
      onClose={handleClose}
      button={
        <Button
          className={className}
          theme={ButtonTheme.THIN}
          onClick={handleToggle}
          color={!open && isDefault ? ButtonColor.WHITE : ButtonColor.BLUE}
          size={ButtonSize.SMALL}
        >
          {isDefault ? (
            title
          ) : (
            <span className={b('buttonContent')}>
              <span className={b('buttonWord')}>от</span>&nbsp;{spaceDigits(value.start)}
              &nbsp;<span className={b('rub')}>₽</span>&nbsp;
              <span className={b('buttonWord')}>до</span>&nbsp;
              {spaceDigits(value.end)}&nbsp;<span className={b('rub')}>₽</span>
            </span>
          )}
        </Button>
      }
    >
      <div className={b()}>
        <div className={b('value')}>
          {spaceDigits(value.start)}&nbsp;<span className={b('rub')}>₽</span>&nbsp;–&nbsp;
          {spaceDigits(value.end)}&nbsp;
          <span className={b('rub')}>₽</span>
        </div>
        <div className={b('range')}>
          <Range
            min={min}
            max={max}
            step={step}
            theme={RangeTheme.BLUE_CHART}
            value={value}
            chartData={chartData}
            minRangeValue={minRangeValue}
            maxRangeValue={maxRangeValue}
            onChange={onChange}
          />
        </div>
      </div>
    </DropdownPanel>
  )
}
