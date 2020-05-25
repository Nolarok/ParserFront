import React, { useCallback, MouseEvent, ReactNode } from 'react'
import cn from 'classnames'
import { Icon } from '@/ui/Icon'
import { block } from '@/helpers/bem'
import css from './SelectList.scss'

const b = block('selectList', css)

export type DropdownItem = {
  id: string
  content: ReactNode | string
}

type Props = {
  className?: string
  items: DropdownItem[]
  selectedIds?: string[]
  onSelect: (ids: string[]) => void
}

export const SelectList: React.FC<Props> = props => {
  const { items = [], selectedIds = [], onSelect, className } = props

  const handleItemClick = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      const selectedId = e.currentTarget.value.toString()
      const isSelected = selectedIds.includes(selectedId)
      const newSelectedIds = isSelected
        ? selectedIds.filter(id => id !== selectedId)
        : [...selectedIds, selectedId]

      onSelect(newSelectedIds)
    },
    [onSelect, selectedIds]
  )

  const renderItem = useCallback(
    (item: DropdownItem) => {
      const selected = selectedIds.indexOf(item.id) !== -1

      return (
        <li key={item.id} className={cn(b('item', { selected }))}>
          <button
            value={item.id}
            type="button"
            onClick={handleItemClick}
            className={b('itemButton')}
          >
            <span className={b('inner')}>
              {item.content} {selected && <Icon icon="check" className={b('icon')} />}
            </span>
          </button>
        </li>
      )
    },
    [selectedIds, handleItemClick]
  )

  const content = <ul className={b('items')}>{items.map(renderItem)}</ul>

  return <div className={cn(className, b())}>{content}</div>
}
