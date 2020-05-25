import React from 'react'
import { block } from '@/helpers/bem'
import { Header, Row } from '@/ui/Calendar/type'
import css from './CalendarGrid.scss'

const b = block('container', css)

type Props = {
  headers: Header[]
  rows: Row[]
  renderContent: (rowId: string, headerId: string) => React.ReactNode
  renderHeader: (header: Header) => React.ReactNode
}

export const CalendarGrid: React.FC<Props> = props => {
  const { headers, rows, renderContent, renderHeader } = props

  return (
    <div className={b()}>
      <div className={b('headers')}>
        <div className={b('cell', { type: 'zero' })} />
        {headers.map(renderHeader)}
      </div>
      {rows.map((row, rowIndex) => (
        <div key={row.id} className={b('row')}>
          <div className={b('cell', { type: 'first' })}>
            <span className={b('firstCellText')}>{row.title}</span>
          </div>
          {headers.map(header => (
            <div key={header.id} className={b('cell', { type: rowIndex === 0 && 'firstRow' })}>
              {renderContent(row.id, header.id)}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
