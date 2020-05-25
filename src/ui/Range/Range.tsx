import React from 'react'
import css from './Range.scss'
import { Icon } from '@/ui/Icon'
import { block } from '@/helpers/bem'
import { ClickOutside } from '@/helpers/ClickOutside'

const b = block('range', css)

export type RangeBorders = {
  start: number
  end: number
}

export enum RangeTheme {
  DEFAULT = 'default',
  RED_VOLUME = 'redVolume',
  BLUE_CHART = 'blueChart',
}

type Props = {
  min: number
  max: number
  step: number
  value: RangeBorders
  minRangeValue: number
  maxRangeValue: number
  single?: boolean
  theme?: RangeTheme
  chartData?: number[]
  onChange: (value: RangeBorders) => void
}

type Point = 'start' | 'end'

type State = {
  activePoint?: Point
}

const getPercentFromValue = (max: number, min: number, value: number): number => {
  const onePercent = (max - min) / 100

  return (value - min) / onePercent
}

const getValueFromPercent = (max: number, min: number, percent: number): number => {
  const onePercent = (max - min) / 100

  return min + onePercent * percent
}

export class Range extends React.PureComponent<Props, State> {
  wrapperRef = React.createRef<HTMLDivElement>()
  state = {
    activePoint: undefined as Point | undefined,
  }

  componentWillUnmount(): void {
    document.removeEventListener('mousemove', this.handleMouseMove)
    document.removeEventListener('mouseup', this.handleMouseUp)
  }

  handleClickOutside = (): void => this.setState({ activePoint: undefined })

  handleMovePoint = (newPoint: number, changePoint?: Point): void => {
    const { single, max, onChange, min, minRangeValue, maxRangeValue, value } = this.props
    const newPosition = { ...value }

    if (!changePoint) {
      return
    }

    // Обработка выхода за границы контейнера
    if (newPoint > max) {
      newPosition[changePoint] = max
    } else if (newPoint < min) {
      newPosition[changePoint] = min
    } else {
      newPosition[changePoint] = newPoint
    }

    // Ограничение диапазона через minRangeValue/maxRangeValue
    if (single) {
      if (newPosition.end < minRangeValue) {
        newPosition.end = minRangeValue
      } else if (newPosition.end > maxRangeValue) {
        newPosition.end = maxRangeValue
      }
    } else if (newPosition.end - newPosition.start < minRangeValue) {
      if (changePoint === 'start') {
        newPosition.start = newPosition.end - minRangeValue
      } else {
        newPosition.end = newPosition.start + minRangeValue
      }
    } else if (newPosition.end - newPosition.start > maxRangeValue) {
      if (changePoint === 'start') {
        newPosition.start = newPosition.end - maxRangeValue
      } else {
        newPosition.end = newPosition.start + maxRangeValue
      }
    }

    onChange(newPosition)
  }

  handleMove = (mouseX: number, isMouseDown: boolean): void => {
    if (!this.wrapperRef.current) {
      return
    }
    const { activePoint } = this.state
    const { single, value, step, max, min } = this.props
    const wrapperRect = this.wrapperRef.current.getBoundingClientRect()
    const positionInRange = mouseX - wrapperRect.left
    const newPositionPercent = (positionInRange / wrapperRect.width) * 100
    const newPosition = getValueFromPercent(max, min, newPositionPercent)
    const diff = newPosition % step
    const newValue = diff > step / 2 ? newPosition + (step - diff) : newPosition - diff

    let newActivePoint = activePoint

    // Вычисление точки, которую двигаем
    if (isMouseDown) {
      if (single) {
        newActivePoint = 'end'
      } else {
        newActivePoint =
          Math.abs(value.end - newValue) > Math.abs(newValue - value.start) ? 'start' : 'end'
      }
    }

    this.handleMovePoint(newValue, newActivePoint)
    this.setState({ activePoint: newActivePoint })
  }

  handleMouseMove = (e: MouseEvent): void => this.handleMove(e.pageX, false)

  handleMouseDown = (e: React.MouseEvent): void => {
    this.handleMove(e.pageX, true)
    document.addEventListener('mousemove', this.handleMouseMove)
    document.addEventListener('mouseup', this.handleMouseUp)
  }

  handleMouseUp = (): void => {
    document.removeEventListener('mousemove', this.handleMouseMove)
    document.removeEventListener('mouseup', this.handleMouseUp)
  }

  handleSetActivePoint = (point: Point) => (): void => this.setState({ activePoint: point })

  handleKeyDown = (event: React.KeyboardEvent): void => {
    const { activePoint } = this.state
    const { value, step } = this.props

    if (!activePoint) {
      return
    }
    if (event.key === 'ArrowRight') {
      this.handleMovePoint(value[activePoint] + step, activePoint)
    } else if (event.key === 'ArrowLeft') {
      this.handleMovePoint(value[activePoint] - step, activePoint)
    }
  }

  render(): React.ReactElement {
    const { activePoint } = this.state
    const { single, min = 0, max = 10, theme = RangeTheme.DEFAULT, chartData, value } = this.props
    const maxChartItem = chartData ? Math.max(...chartData) : 0
    const chartItemWidth = chartData ? 100 / chartData.length : 0
    const positionStart = getPercentFromValue(max, min, value.start)
    const positionEnd = getPercentFromValue(max, min, value.end)

    return (
      <ClickOutside onClick={this.handleClickOutside}>
        <div
          onBlur={this.handleClickOutside}
          className={b({ theme })}
          ref={this.wrapperRef}
          onMouseDown={this.handleMouseDown}
          onKeyDown={this.handleKeyDown}
        >
          <div className={b('line')}>
            <div
              className={b('activeLine')}
              style={{
                width: `${single ? positionEnd : positionEnd - positionStart}%`,
                left: `${single ? 0 : positionStart}%`,
              }}
            />
          </div>
          {!single && (
            <div className={b('point')} style={{ left: `${positionStart}%` }}>
              <div className={b('tooltip')}>
                <span className={b('tooltipInner')}>{value.start}</span>
              </div>
              <button
                className={b('pointInner', { active: activePoint === 'start' })}
                onFocus={this.handleSetActivePoint('start')}
              />
            </div>
          )}
          <div className={b('point')} style={{ left: `${positionEnd}%` }}>
            <div className={b('tooltip')}>
              <span className={b('tooltipInner')}>{value.end}</span>
            </div>
            <button
              className={b('pointInner', { active: activePoint === 'end' })}
              onFocus={this.handleSetActivePoint('end')}
            />
          </div>
          {chartData && (
            <div className={b('chart')}>
              {chartData.map((item, index) => (
                <div
                  key={index}
                  className={b('chartItem', {
                    active: single
                      ? chartItemWidth * (index + 1) < positionEnd
                      : chartItemWidth * (index + 1) > positionStart &&
                        chartItemWidth * (index + 1) < positionEnd,
                  })}
                  style={{ height: `${(item * 100) / maxChartItem}%` }}
                />
              ))}
            </div>
          )}
          {theme === RangeTheme.RED_VOLUME && <Icon icon="range" className={b('volume')} />}
        </div>
      </ClickOutside>
    )
  }
}
