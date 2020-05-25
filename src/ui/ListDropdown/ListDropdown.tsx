import React from 'react'
import { DropdownPanel } from '@/ui/DropdownPanel'
import { block } from '@/helpers/bem'
import { Button, ButtonSize, ButtonTheme, ButtonColor } from '@/ui/Button'
import { SelectList, DropdownItem } from '@/ui/SelectList'
import css from './ListDropdown.scss'

const b = block('listDropdown', css)

type Props = {
  title: string
  className?: string
  items: DropdownItem[]
  selectedIds: string[]
  onChange: (ids: string[]) => void
  onClose: () => void
}

export const ListDropdown: React.FC<Props> = props => {
  const { selectedIds, items, title, className, onChange, onClose } = props
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
  }, [onClose, setOpen, open])

  return (
    <DropdownPanel
      open={open}
      onClose={handleClose}
      button={
        <Button
          className={className}
          theme={ButtonTheme.THIN}
          onClick={handleToggle}
          color={!open && selectedIds.length === 0 ? ButtonColor.WHITE : ButtonColor.BLUE}
          size={ButtonSize.SMALL}
        >
          {selectedIds.length === 0 ? (
            title
          ) : (
            <div className={b('buttonText')}>
              {items
                .filter(item => selectedIds.includes(item.id))
                .map(item => item.content)
                .join(', ')}
            </div>
          )}
        </Button>
      }
    >
      <SelectList items={items} selectedIds={selectedIds} onSelect={onChange} />
    </DropdownPanel>
  )
}
